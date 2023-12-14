package com.group25.webapp.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.Setter;

import java.io.IOException;

/**
 * The Class for EmissionData
 */
public class EmissionData implements Data {
    @Getter
    @Setter
    private Long co2;
    @Getter
    @Setter
    private Long ch4;
    @Getter
    @Setter
    private Long n20;
    @Getter
    @Setter
    private Long ghg;
    @Getter
    @Setter
    private Integer year;

    /**
     * The constructor for EmissionData
     *
     * @param co2 the co2
     * @param ch4 the ch4
     * @param n20 the n20
     * @param ghg the ghg
     */
    public EmissionData(Integer year, Long co2, Long ch4, Long n20, Long ghg) {
        this.co2 = co2;
        this.ch4 = ch4;
        this.n20 = n20;
        this.ghg = ghg;
        this.year = year;
    }

    public EmissionData() {

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
