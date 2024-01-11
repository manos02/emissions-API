package com.group25.webapp.model.data;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.Setter;

import java.io.IOException;

/**
 * The class for temperature data.
 */
public class TemperatureData implements Data {
    @Getter
    @Setter
    private Integer year;
    @Getter
    @Setter
    private Double shares;
    @Getter
    @Setter
    private Double change_ch4;
    @Getter
    @Setter
    private Double change_n20;
    @Getter
    @Setter
    private Double change_co2;
    @Getter
    @Setter
    private Double change_ghg;

    /**
     * The constructor for TemperatureData.
     *
     * @param shares     the shares
     * @param change_ch4 the change from ch4
     * @param change_n20 the change from n20
     * @param change_co2 the change from co2
     * @param change_ghg the change from ghg
     */
    public TemperatureData(Integer year, Double shares, Double change_ch4, Double change_n20, Double change_co2, Double change_ghg) {
        this.shares = shares;
        this.change_ghg = change_ghg;
        this.change_ch4 = change_ch4;
        this.change_co2 = change_co2;
        this.change_n20 = change_n20;
        this.year = year;
    }

    public TemperatureData() {

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
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
