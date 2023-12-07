package com.group25.webapp.model;

/**
 * The abstract class for any class that holds other data.
 */
public abstract class DataHolder implements Data {

    private EmissionData emissionData;
    private EnergyData energyData;
    private GeneralData generalData;
    private TemperatureData temperatureData;


    /**
     * The constructor for DataHolder.
     * @param emissionData the EmissionData
     * @param energyData the EnergyData
     * @param generalData the GeneralData
     * @param temperatureData the TemperatureData
     */
    public DataHolder(EmissionData emissionData, EnergyData energyData,
                      GeneralData generalData, TemperatureData temperatureData) {
        this.emissionData = emissionData;
        this.energyData = energyData;
        this.generalData = generalData;
        this.temperatureData = temperatureData;
    }

//    /**
//     * The getter for fullData.
//     * @return FullData
//     */
//    public FullData getFullData() {
//        return new FullData(emissionData, energyData, generalData, temperatureData);
//    }

    @Override
    public String toJson() {
        return null;
    }

    @Override
    public Data fromJson(String json) {
        return null;
    }

}
