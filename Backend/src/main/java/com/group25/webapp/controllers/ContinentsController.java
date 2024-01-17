package com.group25.webapp.controllers;


import com.group25.webapp.errors.MyResourceNotFoundException;
import com.group25.webapp.errors.WrongQueryException;
import com.group25.webapp.service.ContinentsService;
import com.group25.webapp.util.JsonToCsv;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

/**
 * The controller for continents.
 */
@RestController
@CrossOrigin
public class ContinentsController {

    @Autowired
    private ContinentsService continentsService;

    /**
     * The method for the get request of the /continents path.
     *
     * @param order  the order to order by
     * @param limit  the limit of data returned
     * @param offset the offset of the data returned
     * @return The list of all continents after filtering.
     */
    @GetMapping("/continents")
    public ResponseEntity<String> continentGet(@RequestParam(required = false) Integer limit, @RequestParam(required = false) String order,
                                               @RequestParam(required = false) Integer offset, @RequestHeader HttpHeaders headers) {
        try {
            String data = continentsService.JSONContinentSummaries(order, limit, offset);
            return csvOrJson(headers, data);
        } catch (WrongQueryException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wrong query parameter", e);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * The method for the get request of the /continents/{name} path.
     *
     * @param name      the name of the continent
     * @param dataType the datatype to display (shows full data by default)
     * @param order    the order (descending or ascending, ascending by default)
     * @param limit    how many entries we are outputting
     * @param offset   what the limit is offset by
     * @param lower    the lower limit for years
     * @param upper    the upper limit for years
     * @return the data list for a continent identified by name and optionality filtered by datatype, order, limit, offset,
     * lower and upper.
     */
    @GetMapping("/continents/{name}")
    public ResponseEntity<String> continentISOGet(@PathVariable String name, @RequestParam(required = false) Integer dataType,
                                  @RequestParam(required = false) String order,
                                  @RequestParam(required = false) Integer limit,
                                  @RequestParam(required = false) Integer offset,
                                  @RequestParam(required = false) Integer lower,
                                  @RequestParam(required = false) Integer upper,
                                  @RequestHeader HttpHeaders headers) {
        try {
            String data = continentsService.JSONContinentSummaryByName(name, dataType, order, limit, offset, lower, upper);
            return csvOrJson(headers, data);
        } catch (MyResourceNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No continent with given name", e);
        } catch (WrongQueryException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wrong query parameter", e);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * The method for the post request of the /countries/{ISO} path.
     *
     * @param name      the name of the continent
     * @param jsonYear the year in json format of the data to be created.
     * @return success if successful
     */
    @PostMapping("/continents/{name}")
    public String continentISOYearPost(@PathVariable String name,
                                       @RequestBody String jsonYear) {
        try {
            continentsService.createData(name, jsonYear);
        } catch (MyResourceNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No entry for given name", e);
        }
        return "Success";
    }

    /**
     * The method for the get request of the /continents/{ISO}/{year} path.
     *
     * @param name     the name of the continent
     * @param year     the year of the data
     * @param dataType the data type returned (full data by default)
     * @return the data entry of a specific continent (identified by name) and year
     */
    @GetMapping("/continents/{name}/{year}")
    public ResponseEntity<String> continentISOYearGet(@PathVariable String name, @PathVariable Integer year, @RequestParam(required = false) Integer dataType, @RequestHeader HttpHeaders headers)  {
        try {
            String data = continentsService.JSONContinentSummaryByNameAndYear(name, year, dataType);
            return csvOrJson(headers,data);
        } catch (MyResourceNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No entry for given name and year", e);
        } catch (WrongQueryException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wrong query parameter", e);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * The method for the put request for the /continents/{name}/{year} path.
     *
     * @param name            the name of the continent
     * @param year           the year of the data
     * @param dataType       the dataType to update (full data by default)
     * @param updatedContinent the updated information in json format
     * @return the updated information
     */
    @PutMapping("/continents/{name}/{year}")
    public String continentISOYearPut(@PathVariable String name, @PathVariable Integer year,
                                      @RequestParam(required = false) Integer dataType,
                                      @RequestBody String updatedContinent) {
        try {
            return continentsService.updateData(name, year, dataType, updatedContinent);
        } catch (MyResourceNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No entry for given name and year", e);
        }
    }

    /**
     * The method for the delete request of the /continent/{ISO}/{year} path.
     *
     * @param name  the name of the continent
     * @param year the year of the data
     * @return successfully deleted if success
     */
    @DeleteMapping("/continents/{name}/{year}")
    public String continentISOYearDelete(@PathVariable String name, @PathVariable Integer year) {
        try {
            continentsService.deleteData(name, year);
            return "successfully deleted";
        }  catch (MyResourceNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No continent with given name and year", e);
        }
    }

    /**
     * The method for the get request of the /countries/year{year} path.
     *
     * @param year     the year
     * @param dataType the datatype (full data by default)
     * @param order    the order (descending or ascending, ascending by default)
     * @param limit    the limit for the number of entries outputted
     * @param offset   the offset of the limit
     * @param lower    the lower bound of population
     * @param upper    the upper bound of population
     * @return the list of the data for all continents in a specific year, optionally filtered by datatype, order, limit,
     * offset, lower bounds and upper bounds.
     */
    @GetMapping("/continents/year{year}")
    public ResponseEntity<String> continentYearGet(@PathVariable Integer year, @RequestParam(required = false) Integer dataType,
                                                   @RequestParam(required = false) String order,
                                                   @RequestParam(required = false) Integer limit,
                                                   @RequestParam(required = false) Integer offset,
                                                   @RequestParam(required = false) Integer lower,
                                                   @RequestParam(required = false) Integer upper,
                                                   @RequestParam(required = false) String filter,
                                                   @RequestHeader HttpHeaders headers) {
        try {
            String data = continentsService.JSONGetYearData(year, dataType, order, limit, offset, lower, upper, filter);
            return csvOrJson(headers, data);
        } catch (MyResourceNotFoundException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No entry for given year", e);
        } catch (WrongQueryException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Wrong query parameter", e);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Processes input data and returns a response in either CSV or JSON format.
     *
     * @param headers The HTTP headers of the incoming request, used to determine the desired response format.
     * @param data The input data in string format.
     * @return ResponseEntity<String> An HTTP response entity containing the data in either CSV or JSON format with appropriate content type set.
     * @throws Exception If any error occurs during the processing, conversion, or handling of the data.
     */
    public ResponseEntity<String> csvOrJson(HttpHeaders headers, String data) throws Exception {
        if (headers.getAccept().contains(MediaType.valueOf("text/csv"))) {
            JsonToCsv converter = new JsonToCsv();
            data = converter.convert(data);
            return ResponseEntity.ok().contentType(MediaType.valueOf("text/csv")).body(data);
        } else {
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(data);
        }
    }
}
