package com.group25.webapp.model;

/**
 * The class for a continent.
 */
public class Continent extends DataHolder {
    private String name;

    /**
     * The constructor for Continent.
     * @param name the name of the continent
     * @param emissionData the emissionData
     * @param energyData the energyData
     * @param generalData teh generalData
     * @param temperatureData the temperatureData
     */
    public Continent(String name, EmissionData emissionData, EnergyData energyData,
                   GeneralData generalData, TemperatureData temperatureData) {
        super(emissionData, energyData, generalData, temperatureData);
        this.name = name;
    }
}
