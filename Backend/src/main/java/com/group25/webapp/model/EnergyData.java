package com.group25.webapp.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.Setter;

import java.io.IOException;

/**
 * The class for EnergyData.
 */
public class EnergyData implements Data {
    @Getter @Setter
    private Long energy_per_cap;
    @Getter @Setter
    private Long energy_per_ghg;
    @Getter @Setter
    private Integer year;

    /**
     * The constructor for EnergyData.
     * @param energy_per_cap the energy per cap
     * @param energy_per_ghg the energy per ghg
     */
    public EnergyData(Integer year, Long energy_per_cap, Long energy_per_ghg) {
        this.energy_per_cap = energy_per_cap;
        this.energy_per_ghg = energy_per_ghg;
        this.year = year;
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
        }catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
