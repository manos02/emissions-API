package com.group25.webapp.controllers;

import com.group25.webapp.service.YearService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class YearController {

    @Autowired
    private YearService yearService;


    @GetMapping("/years")
    public String yearsGet(@RequestParam(required = false) String order, @RequestParam(required = false) Integer limit,
                           @RequestParam(required = false) Integer offset) {
        return yearService.getYears(order, offset, limit);
    }

    @GetMapping("/years/{year}")
    public String yearsYearGet(@PathVariable Integer year) {
        return "something";
    }
    @GetMapping("/years/{year}/general-data")
    public String generalDataGet(@PathVariable Integer year, @RequestParam(required = false) String order,
                                 @RequestParam(required = false) Integer limit,
                                 @RequestParam(required = false) Integer offset){
        return yearService.JSONSpecificData(year, 0, order, offset, limit);
    }

    @GetMapping("/years/{year}/emission-data")
    public String emissionDataGet(@PathVariable Integer year, @RequestParam(required = false) String order,
                                  @RequestParam(required = false) Integer limit,
                                  @RequestParam(required = false) Integer offset){
        return yearService.JSONSpecificData(year, 1, order, offset, limit);
    }

    @GetMapping("/years/{year}/temperature-data")
    public String temperatureDataGet(@PathVariable Integer year, @RequestParam(required = false) String order,
                                     @RequestParam(required = false) Integer limit,
                                     @RequestParam(required = false) Integer offset){
        return yearService.JSONSpecificData(year, 3, order, offset, limit);
    }

    @GetMapping("/years/{year}/energy-data")
    public String energyDataGet(@PathVariable Integer year, @RequestParam(required = false) String order,
                                @RequestParam(required = false) Integer limit,
                                @RequestParam(required = false) Integer offset){
        return yearService.JSONSpecificData(year, 2, order, offset, limit);
    }

    @GetMapping("/years/{year}/full-data")
    public String fullDataGet(@PathVariable Integer year, @RequestParam(required = false) String order,
                              @RequestParam(required = false) Integer limit,
                              @RequestParam(required = false) Integer offset){
        return yearService.JSONSpecificData(year, 4, order, offset, limit);
    }

}
