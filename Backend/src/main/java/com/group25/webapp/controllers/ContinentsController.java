package com.group25.webapp.controllers;


import com.group25.webapp.errors.NotFound;
import com.group25.webapp.service.ContinentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
     * The method for the get request of the /countries path.
     *
     * @param filter the filter to filter by
     * @param order  the order to order by
     * @param limit  the limit of data returned
     * @param offset the offset of the data returned
     * @return The list of all countries after filtering.
     */
    @GetMapping("/continents")
    public String continentGet(@RequestParam(required = false) String filter, @RequestParam(required = false) String order,
                               @RequestParam(required = false) Integer limit, @RequestParam(required = false) Integer offset) {
        return continentsService.JSONContinentSummaries(filter, order, limit, offset);
    }

    /**
     * The method for the get request of the /countries/{ISO} path.
     *
     * @param ISO      the ISO of the country
     * @param dataType the datatype to display (shows fulldata by default)
     * @param order    the order (descending or ascending, ascending by default)
     * @param limit    how many entries we are outputting
     * @param offset   what the limit is offset by
     * @param lower    the lower limit for years
     * @param upper    the upper limit for years
     * @return the data list for a country identified by ISO and optionality filtered by datatype, order, limit, offset,
     * lower and upper.
     */
    @GetMapping("/continents/{ISO}")
    public String continentISOGet(@PathVariable String ISO, @RequestParam(required = false) Integer dataType,
                                  @RequestParam(required = false) String order,
                                  @RequestParam(required = false) Integer limit,
                                  @RequestParam(required = false) Integer offset,
                                  @RequestParam(required = false) Integer lower,
                                  @RequestParam(required = false) Integer upper) throws ResponseStatusException {
        try {
            return continentsService.JSONContinentSummaryByName(ISO, dataType, order, limit, offset, lower, upper);
        } catch (NotFound e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No entry with given name", e);
        }
    }

    /**
     * The method for the post request of the /countries/{ISO} path.
     *
     * @param ISO      the ISO of the country
     * @param jsonYear the year in json format of the data to be created.
     * @return success if succesful
     */
    @PostMapping("/continents/{ISO}")
    public String continentISOYearPost(@PathVariable String ISO,
                                       @RequestBody String jsonYear) {
        continentsService.createData(ISO, jsonYear);
        return "Success";
    }

    /**
     * The method for the get request of the /countries/{ISO}/{year} path.
     *
     * @param ISO      the ISO of the country
     * @param year     the year of the data
     * @param dataType the data type returned (fulldata by default)
     * @return the data entry of a specific country (identified by ISO) and year
     */
    @GetMapping("/continents/{ISO}/{year}")
    public String continentISOYearGet(@PathVariable String ISO, @PathVariable Integer year, @RequestParam(required = false) Integer dataType) throws ResponseStatusException {
        try {
            return continentsService.JSONContinentSummaryByNameAndYear(ISO, year, dataType);
        } catch (NotFound e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No entry for given name and year", e);
        }
    }

    /**
     * The method for the put request for the /countries/{ISO}/{year} path.
     *
     * @param ISO            the ISO of the country
     * @param year           the year of the data
     * @param dataType       the dataType to update (fulldata by default)
     * @param updatedCountry the updated information in json format
     * @return the updated information
     */
    @PutMapping("/continents/{ISO}/{year}")
    public String continentISOYearPut(@PathVariable String ISO, @PathVariable Integer year,
                                      @RequestParam(required = false) Integer dataType,
                                      @RequestBody String updatedCountry) {
        return continentsService.updateData(ISO, year, dataType, updatedCountry);
    }

    /**
     * The method for the delete request of the /countries/{ISO}/{year} path.
     *
     * @param ISO  the ISO of the country
     * @param year the year of the data
     * @return successfully deleted if success
     */
    @DeleteMapping("/continents/{ISO}/{year}")
    public String continentISOYearDelete(@PathVariable String ISO, @PathVariable Integer year) {
        continentsService.deleteData(ISO, year);
        return "successfully deleted";
    }

    /**
     * The method for the get request of the /countries/year{year} path.
     *
     * @param year     the year
     * @param dataType the datatype (fulldata by default)
     * @param order    the order (descending or ascending, ascending by default)
     * @param limit    the limit for the number of entries outputted
     * @param offset   the offset of the limit
     * @param lower    the lower bound of population
     * @param upper    the upper bound of population
     * @return the list of the data for all countries in a specific year, optionally filtered by datatype, order, limit,
     * offset, lower bounds and upper bounds.
     */
    @GetMapping("/continents/year{year}")
    public String continentYearGet(@PathVariable Integer year, @RequestParam(required = false) Integer dataType,
                                   @RequestParam(required = false) String order,
                                   @RequestParam(required = false) Integer limit,
                                   @RequestParam(required = false) Integer offset,
                                   @RequestParam(required = false) Integer lower,
                                   @RequestParam(required = false) Integer upper) throws ResponseStatusException {
        try {
            return continentsService.JSONGetYearData(year, dataType, order, limit, offset, lower, upper);
        } catch (NotFound e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No entry for given year", e);
        }
    }


}
