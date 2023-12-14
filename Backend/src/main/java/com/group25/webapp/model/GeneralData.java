package com.group25.webapp.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.Setter;

import java.io.IOException;

/**
 * The class for general data.
 */
public class GeneralData implements Data {
    @Getter
    @Setter
    private Long population;
    @Getter
    @Setter
    private Long gdp;
    @Getter
    @Setter
    private Integer year;

    public GeneralData() {

    }

    /**
     * The constructor for GeneralData.
     *
     * @param population the population
     * @param gdp        the gdp
     */
    public GeneralData(Integer year, Long population, Long gdp) {
        this.year = year;
        this.population = population;
        this.gdp = gdp;
    }

    @Override
    public String toJson() {

        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public Data fromJson(String json) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.readValue(json, this.getClass());
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
