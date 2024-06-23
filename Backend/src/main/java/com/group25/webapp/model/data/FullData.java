package com.group25.webapp.model.data;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.Setter;

import java.io.IOException;

/**
 * The class for FullData.
 */
public class FullData implements Data {
    @Getter
    @Setter
    private Integer year;
    @Getter
    @Setter
    private EmissionData emissionData;
    @Getter
    @Setter
    private EnergyData energyData;
    @Getter
    @Setter
    private GeneralData generalData;
    @Getter
    @Setter
    private TemperatureData temperatureData;

    /**
     * The constructor for FullData.
     *
     * @param emissionData    the EmissionData
     * @param energyData      the EnergyData
     * @param generalData     the GeneralData
     * @param temperatureData the TemperatureData
     */
    public FullData(Integer year, EmissionData emissionData, EnergyData energyData, GeneralData generalData, TemperatureData temperatureData) {
        this.emissionData = emissionData;
        this.energyData = energyData;
        this.generalData = generalData;
        this.temperatureData = temperatureData;
        this.year = year;
    }

    public FullData() {

    }

    public Long population() {
        if (getGeneralData().getPopulation() == null) {
            return (long) -1;
        }
        return getGeneralData().getPopulation();
    }

    public Data retrieveDataByType(Integer dataType) {
        if (dataType == null) {
            return this;
        }
        return switch (dataType) {
            case 0 -> getGeneralData();
            case 1 -> getEmissionData();
            case 2 -> getEnergyData();
            case 3 -> getTemperatureData();
            case 4 -> this;
            default -> null;
        };
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
