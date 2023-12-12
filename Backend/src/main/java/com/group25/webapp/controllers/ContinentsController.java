package com.group25.webapp.controllers;


import com.group25.webapp.service.ContinentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * The controller for continents.
 */
@RestController
public class ContinentsController {

    @Autowired
    private ContinentsService continentsService;

    /**
     * The method for the get request of the /continents path.
     * @param filter the filter
     * @param order the order
     * @param limit the limit
     * @param offset the offset
     * @return The list of all continents after filtering.
     */
    @GetMapping("/continents")
    public String continentsGet(@RequestParam(required = false) String filter, @RequestParam(required = false) String order,
                               @RequestParam(required = false) Integer limit, @RequestParam(required = false) Integer offset) {
        return "something";
    }

    /**
     * The method for the get request of the /continents/{name} path.
     * @param name the name of the continent
     * @return the summary of the continent
     */
    @GetMapping("/continents/{name}")
    public String continentNameGet(@RequestParam String name) {
        return "something";
    }

    /**
     * The method for the get request of the /continents/{name}/general-data path.
     * @param name the name of the continent
     * @param lowerLimit the lowerLimit
     * @param upperLimit the lowerLimit
     * @return all the general data of the continent specified by name
     */
    @GetMapping("/continents/{name}/general-data")
    public String getContinentGeneralData(@PathVariable String name, @RequestParam(required = false) Integer lowerLimit,
                          @RequestParam(required = false) Integer upperLimit) {
        return "string";
    }

    /**
     * The get request for the /continents/{name}/general-data/{year} path.
     * @param name the name of the continent
     * @param year the year of the general data
     * @return the specific general data of the continent specified by name and year
     */
    @GetMapping("/continents/{name}/general-data/{year}")
    public String getYearContinentGeneralData(@PathVariable String name, @PathVariable String year) {
        return "string";
    }

    /**
     * The put request for the /continents/{name}/general-data/{year} path.
     * @param name the name of the continent
     * @param year the year of the general data
     * @param Data the new data
     * @return the updated data
     */
    @PutMapping("/continents/{name}/general-data/{year}")
    public String putYearContinentGeneralData(@PathVariable String name, @PathVariable String year, @RequestBody String Data) {
        return "string";
    }

    /**
     * The post request for the /continents/{name}/general-data/{year} path.
     * @param name the name of the continent
     * @param year the year of the general data
     * @param Data the new data
     * @return the newly created data
     */
    @PostMapping("/continents/{name}/general-data/{year}")
    public String postYearContinentGeneralData(@PathVariable String name, @PathVariable String year, @RequestBody String Data) {
        return "string";
    }

    /**
     * The delete request for the /continents/{name}/general-data/{year} path.
     * @param name the name of the continent
     * @param year the year of the general data
     * @return "deleted data"
     */
    @DeleteMapping("/continents/{name}/general-data/{year}")
    public String DeleteYearContinentGeneralData(@PathVariable String name, @PathVariable String year) {
        return "string";
    }

    /**
     * The get request for /continents/{name}/emission-data path.
     * @param name the name of the continent
     * @return all the emission data of the continent specified by name
     */
    @GetMapping("/continents/{name}/emission-data")
    public String getContinentEmissionData(@PathVariable String name) {
        return "string";
    }

    /**
     * The get request for /continents/{name}/emission-data/{year}
     * @param name the name of the continent
     * @param year the year of the data
     * @return the emission data of the continent specified by name and year
     */
    @GetMapping("/continents/{name}/emission-data/{year}")
    public String getYearContinentEmissionData(@PathVariable String name, @PathVariable String year) {
        return "string";
    }

    @PutMapping("/continents/{name}/emissions-data/{year}")
    public String putYearContinentEmissionData(@PathVariable String name, @PathVariable String year, @RequestBody String data) {
        return "string";
    }

    @PostMapping("/continents/{name}/emissions-data/{year}")
    public String postYearContinentEmissionData(@PathVariable String name, @PathVariable String year, @RequestBody String data) {
        return "string";
    }

    @DeleteMapping("/continents/{name}/emissions-data/{year}")
    public String deleteYearContinentEmissionData(@PathVariable String name, @PathVariable String year) {
        return "string";
    }

    @GetMapping("/continents/{name}/energy-data")
    public String getContinentEnergyData(@PathVariable String name) {
        return "string";
    }

    @GetMapping("/continents/{name}/energy-data/{year}")
    public String getYearContinentEnergyData(@PathVariable String name, @PathVariable String year) {
        return "string";
    }

    @PutMapping("/continents/{name}/energy-data/{year}")
    public String putYearContinentEnergyData(@PathVariable String name, @PathVariable String year, @RequestBody String data) {
        return "string";
    }

    @PostMapping("/continents/{name}/energy-data/{year}")
    public String postYearContinentEnergyData(@PathVariable String name, @PathVariable String year, @RequestBody String data) {
        return "string";
    }

    @DeleteMapping("/continents/{name}/energy-data/{year}")
    public String deleteYearContinentEnergyData(@PathVariable String name, @PathVariable String year) {
        return "string";
    }

    @GetMapping("/continents/{name}/full-data")
    public String getContinentFullData(@PathVariable String name) {
        return "string";
    }

    @GetMapping("/continents/{name}/full-data/{year}")
    public String getYearContinentFullData(@PathVariable String name, @PathVariable String year) {
        return "string";
    }


}
