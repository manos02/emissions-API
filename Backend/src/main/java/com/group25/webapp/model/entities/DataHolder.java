package com.group25.webapp.model.entities;

import com.group25.webapp.model.data.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@MappedSuperclass
public abstract class DataHolder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    private Integer id;
    @Getter
    @Setter
    @Column(name = "country")
    private String name;
    @Getter
    @Setter
    private Integer year;
    @Getter
    @Setter
    @Column(name = "iso_code")
    private String ISO;
    @Getter
    @Setter
    private Long population;
    @Getter
    @Setter
    private Long gdp;
    @Getter
    @Setter
    private Long co2;
    @Getter
    @Setter
    @Column(name = "energy_per_capita")
    private Long energycapita;
    @Getter
    @Setter
    @Column(name = "energy_per_gdp")
    private Long energygdp;
    @Getter
    @Setter
    private Long methane;
    @Getter
    @Setter
    @Column(name = "nitrous_oxide")
    private Long nitrousoxide;
    @Getter
    @Setter
    @Column(name = "share_of_temperature_change_from_ghg")
    private Double shareghg;
    @Getter
    @Setter
    @Column(name = "temperature_change_from_ch4")
    private Double temperaturech4;
    @Getter
    @Setter
    @Column(name = "temperature_change_from_co2")
    private Double temperatureco2;
    @Getter
    @Setter
    @Column(name = "temperature_change_from_ghg")
    private Double temperatureghg;
    @Getter
    @Setter
    @Column(name = "temperature_change_from_n2o")
    private Double temperaturen2o;
    @Getter
    @Setter
    @Column(name = "total_ghg")
    private Long totalghg;


    public void setGeneralData(GeneralData generalData) {
        year = generalData.getYear();
        population = generalData.getPopulation();
        gdp = generalData.getGdp();
    }

    public void setEnergyData(EnergyData energyData) {
        year = energyData.getYear();
        energycapita = energyData.getEnergy_per_cap();
        energygdp = energyData.getEnergy_per_ghg();
    }

    public void setEmissionData(EmissionData emissionData) {
        year = emissionData.getYear();
        methane = emissionData.getCh4();
        co2 = emissionData.getCo2();
        nitrousoxide = emissionData.getN20();
        totalghg = emissionData.getGhg();
    }

    public void setTemperatureData(TemperatureData temperatureData) {
        year = temperatureData.getYear();
        shareghg = temperatureData.getShares();
        temperaturech4 = temperatureData.getChange_ch4();
        temperaturen2o = temperatureData.getChange_n20();
        temperatureco2 = temperatureData.getChange_co2();
        temperatureghg = temperatureData.getChange_ghg();
    }

    public void setFullData(FullData fullData) {
        year = fullData.getYear();
        setTemperatureData(fullData.getTemperatureData());
        setEmissionData(fullData.getEmissionData());
        setEnergyData(fullData.getEnergyData());
        setGeneralData(fullData.getGeneralData());
    }

    /**
     * The getter for the generalData for the country.
     *
     * @return generalData
     */
    public GeneralData getGeneralData() {
        return new GeneralData(year, population, gdp);
    }

    /**
     * The getter for the energyData for the country.
     *
     * @return energyData
     */
    public EnergyData getEnergyData() {
        return new EnergyData(year, energycapita, energygdp);
    }

    /**
     * The getter for the emissionData for the country.
     *
     * @return emissionData
     */
    public EmissionData getEmissionData() {
        return new EmissionData(year, co2, methane, nitrousoxide, totalghg);
    }

    /**
     * The getter for the temperatureData for the country.
     *
     * @return temperatureData
     */
    public TemperatureData getTemperatureData() {
        return new TemperatureData(year, shareghg, temperaturech4,
                temperaturen2o, temperatureco2, temperatureghg);
    }

    /**
     * Returns a data specified by type.
     *
     * @param dataType The type of the data (0 general, 1 emission, 2 energy, 3 temperature, 4 full)
     * @return The specific data that was requested by dataType.
     */
    public Data retrieveDataByType(Integer dataType) {
        if (dataType == null) {
            return getFullData();
        }
        return switch (dataType) {
            case 0 -> getGeneralData();
            case 1 -> getEmissionData();
            case 2 -> getEnergyData();
            case 3 -> getTemperatureData();
            case 4 -> getFullData();
            default -> null;
        };
    }

    /**
     * The getter for the full data for the country.
     *
     * @return fullData
     */
    public FullData getFullData() {
        return new FullData(year, getEmissionData(), getEnergyData(), getGeneralData(), getTemperatureData());
    }
}
