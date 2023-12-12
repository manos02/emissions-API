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
    @GetMapping("/countries")
    public String countriesGet(@RequestParam(required = false) String filter, @RequestParam(required = false) String order,
                               @RequestParam(required = false) Integer limit, @RequestParam(required = false) Integer offset) {
        return countriesService.JSONcountrySummaries(filter, order, limit, offset);
    }

    /**
     * The method for the post request of the /countries path.
     *
     * @param newCountry the new country (all data is null)
     * @return the new country (all data is null)
     */
    @PostMapping("/countries")
    public String countryISOPost(@PathVariable String ISO, @RequestBody String newCountry) {
        return "PostISO";
    }

    /**
     * The method for the get request of the /countries/{ISO} path.
     *
     * @param ISO the ISO of the specified country.
     * @return the summary of the country.
     */
    @GetMapping("/countries/{ISO}")
    public String countryISOGet(@PathVariable String ISO) {
        return countriesService.JSONCountrySummaryByISO(ISO);
    }

    /**
     * The method for the put request of the /countries/{ISO} path.
     *
     * @param ISO            the ISO of the country
     * @param updatedCountry the new information of the country
     * @return the updated country (data remains the same, but name and ISO could change)
     */
    @PutMapping("/countries/{ISO}")
    public String countryISOPut(@PathVariable String ISO, @RequestBody String updatedCountry) {
        return "PutISO";
    }

    /**
     * The method for the delete request of the /countries/{ISO} path.
     *
     * @param ISO the iso of the country to be deleted
     * @return "country deleted"
     */
    @DeleteMapping("/countries/{ISO}")
    public String countryISODelete(@PathVariable String ISO) {
        return "countryDelete";
    }

    /**
     * The method for the get request of the /countries/{ISO}/general-data path.
     *
     * @param ISO        the ISO of the country
     * @param lowerLimit the lowerLimit to filter by
     * @param upperLimit the upperLimit to filter by
     * @return the data, optionally filtered
     */
    @GetMapping("/countries/{ISO}/general-data")
    public String generalDataGet(@PathVariable String ISO, @RequestParam(required = false) Integer lowerLimit,
                                 @RequestParam(required = false) Integer upperLimit) {
        return countriesService.JSONSpecificData(ISO, 0);
    }

    @GetMapping("/countries/{ISO}/energy-data")
    public String energyDataGet(@PathVariable String ISO, @RequestParam(required = false) Integer lowerLimit,
                                @RequestParam(required = false) Integer upperLimit) {
        return countriesService.JSONSpecificData(ISO, 2);
    }

    @GetMapping("/countries/{ISO}/temperature-data")
    public String temperatureDataGet(@PathVariable String ISO, @RequestParam(required = false) Integer lowerLimit,
                                     @RequestParam(required = false) Integer upperLimit) {
        return countriesService.JSONSpecificData(ISO, 3);
    }

    @GetMapping("/countries/{ISO}/emission-data")
    public String emissionDataGet(@PathVariable String ISO, @RequestParam(required = false) Integer lowerLimit,
                                  @RequestParam(required = false) Integer upperLimit) {
        return countriesService.JSONSpecificData(ISO, 1);
    }

    @GetMapping("/countries/{ISO}/full-data")
    public String fullDataGet(@PathVariable String ISO, @RequestParam(required = false) Integer lowerLimit,
                              @RequestParam(required = false) Integer upperLimit) {
        return countriesService.JSONSpecificData(ISO, 4);
    }

    @GetMapping("/countries/{ISO}/general-data/{year}")
    public String generalDataYearGet(@PathVariable String ISO, @PathVariable String year) {
        return "something";
    }

    @PutMapping("/countries/{ISO}/general-data/{year}")
    public String generalDataYearPut(@PathVariable String ISO, @PathVariable String year, @RequestBody String data) {
        return "something";
    }

    @PostMapping("/countries/{ISO}/general-data/{year}")
    public String generalDataYearPost(@PathVariable String ISO, @PathVariable String year, @RequestBody String data) {
        return "something";
    }

    @DeleteMapping("/countries/{ISO}/general-data/{year}")
    public String generalDataYearDelete(@PathVariable String ISO, @PathVariable String year) {
        return "something";
    }

    @GetMapping("/countries/{ISO}/energy-data/{year}")
    public String energyDataYearGet(@PathVariable String ISO, @PathVariable String year) {
        return "something";
    }

    @PutMapping("/countries/{ISO}/energy-data/{year}")
    public String energyDataYearPut(@PathVariable String ISO, @PathVariable String year, @RequestBody String data) {
        return "something";
    }

    @PostMapping("/countries/{ISO}/energy-data/{year}")
    public String energyDataYearPost(@PathVariable String ISO, @PathVariable String year, @RequestBody String data) {
        return "something";
    }

    @DeleteMapping("/countries/{ISO}/energy-data/{year}")
    public String energyDataYearDelete(@PathVariable String ISO, @PathVariable String year) {
        return "something";
    }

    @GetMapping("/countries/{ISO}/temperature-data/{year}")
    public String temperatureDataYearGet(@PathVariable String ISO, @PathVariable String year) {
        return "something";
    }

    @PutMapping("/countries/{ISO}/temperature-data/{year}")
    public String temperatureDataYearPut(@PathVariable String ISO, @PathVariable String year, @RequestBody String data) {
        return "something";
    }

    @PostMapping("/countries/{ISO}/temperature-data/{year}")
    public String temperatureDataYearPost(@PathVariable String ISO, @PathVariable String year, @RequestBody String data) {
        return "something";
    }

    @DeleteMapping("/countries/{ISO}/temperature-data/{year}")
    public String temperatureDataYearDelete(@PathVariable String ISO, @PathVariable String year) {
        return "something";
    }

    @GetMapping("/countries/{ISO}/emission-data/{year}")
    public String emissionDataYearGet(@PathVariable String ISO, @PathVariable String year) {
        return "something";
    }

    @PutMapping("/countries/{ISO}/emission-data/{year}")
    public String emissionDataYearPut(@PathVariable String ISO, @PathVariable String year, @RequestBody String data) {
        return "something";
    }

    @PostMapping("/countries/{ISO}/emission-data/{year}")
    public String emissionDataYearPost(@PathVariable String ISO, @PathVariable String year, @RequestBody String data) {
        return "something";
    }

    @DeleteMapping("/countries/{ISO}/emission-data/{year}")
    public String emissionDataYearDelete(@PathVariable String ISO, @PathVariable String year) {
        return "something";
    }

    @GetMapping("/countries/{ISO}/full-data/{year}")
    public String fullDataYearGet(@PathVariable String ISO, @PathVariable String year) {
        return "something";
    }
}
