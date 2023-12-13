package com.group25.webapp.controllers;

import com.group25.webapp.service.CountriesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * The controller for countries.
 */
@RestController
public class CountriesController {

    @Autowired
    private CountriesService countriesService;

    /**
     * The method for the get request of the /countries path.
     *
     * @param filter the filter to filter by
     * @param order  the order to order by
     * @param limit  the limit of data returned
     * @param offset the offset of the data returned
     * @return The list of all countries after filtering.
     */
    @GetMapping("/countries")  //DONE
    public String countriesGet(@RequestParam(required = false) String filter, @RequestParam(required = false) String order,
                               @RequestParam(required = false) Integer limit, @RequestParam(required = false) Integer offset) {
        return countriesService.JSONcountrySummaries(filter, order, limit, offset);
    }

    /**
     * The method for the get request of the /countries/{ISO} path.
     *
     * @param ISO the ISO of the specified country.
     * @return the summary of the country.
     */
    @GetMapping("/countries/{ISO}") //DONE
    public String countryISOGet(@PathVariable String ISO, @RequestParam(required = false) Integer dataType,
                                @RequestParam(required = false) String order,
                                @RequestParam(required = false) Integer limit,
                                @RequestParam(required = false) Integer offset,
                                @RequestParam(required = false) Integer lower,
                                @RequestParam(required = false) Integer upper) {
        return countriesService.JSONCountrySummaryByISO(ISO, dataType, order, limit, offset, lower, upper);
    }

    @GetMapping("/countries/{ISO}/{year}") //DONE
    public String countryISOYearGet(@PathVariable String ISO, @PathVariable Integer year, @RequestParam(required = false) Integer dataType) {
        return countriesService.JSONCountrySummaryByISOAndYear(ISO, year, dataType);
    }

    @PostMapping("/countries/{ISO}")
    public String countryISOYearPost(@PathVariable String ISO,
                                     @RequestParam(required = false) Integer dataType,
                                     @RequestBody String jsonYear) {
        countriesService.createData(ISO, jsonYear);
        return "Success";
    }

    /**
     * The method for the put request of the /countries/{ISO}/{year} path.
     *
     * @param ISO
     * @param updatedCountry
     * @return
     */
    @PutMapping("/countries/{ISO}/{year}") //DONE
    public String countryISOYearPut(@PathVariable String ISO, @PathVariable Integer year,
                                    @RequestParam(required = false) Integer dataType,
                                    @RequestBody String updatedCountry) {
        return countriesService.updateData(ISO, year, dataType, updatedCountry);
    }

    /**
     * The method for the delete request of the /countries/{ISO}/{year} path.
     *
     * @param ISO
     * @return
     */
    @DeleteMapping("/countries/{ISO}/{year}")
    public String countryISOYearDelete(@PathVariable String ISO, @PathVariable Integer year, @RequestParam(required = false) Integer dataType) {
        return "countryDelete";
    }

    @GetMapping("/countries/year{year}")  //DONE
    public String countryYearGet(@PathVariable Integer year, @RequestParam(required = false) Integer dataType,
                                 @RequestParam(required = false) String order,
                                 @RequestParam(required = false) Integer limit,
                                 @RequestParam(required = false) Integer offset,
                                 @RequestParam(required = false) Integer lower,
                                 @RequestParam(required = false) Integer upper) {
        return countriesService.JSONGetYearData(year, dataType, order, limit, offset, lower, upper);
    }

}
