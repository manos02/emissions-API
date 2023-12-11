package com.group25.webapp.model;

import jakarta.persistence.Entity;

/**
 * The class for FullData.
 */
@Entity
public class FullData implements Data {

    private EmissionData emissionData;
    private EnergyData energyData;
    private GeneralData generalData;
    private TemperatureData temperatureData;

    /**
     * The constructor for FullData.
     * @param emissionData the EmissionData
     * @param energyData the EnergyData
     * @param generalData the GeneralData
     * @param temperatureData the TemperatureData
     */
    public FullData(EmissionData emissionData, EnergyData energyData, GeneralData generalData, TemperatureData temperatureData) {
        this.emissionData = emissionData;
        this.energyData = energyData;
        this.generalData = generalData;
        this.temperatureData = temperatureData;
    }

    @Override
    public String toJson() {
        return null;
    }

    @Override
    public Data fromJson(String json) {
        return null;
    }

}
