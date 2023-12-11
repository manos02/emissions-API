package com.group25.webapp.model;

import com.group25.webapp.model.dataView.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Entity
@Table (name = "mytable")
public class CountryEntity implements EnergyDataView, EmissionDataView, FullDataView, GeneralDataView,
        TemperatureDataView {

    @Id @GeneratedValue (strategy = GenerationType.SEQUENCE) @Getter
    private Integer id;
    @Getter @Setter
    private String country;
    @Getter @Setter
    private Integer year;
    @Getter @Setter @Column(name="iso_code")
    private String ISO;
    @Getter @Setter
    private Long population;
    @Getter @Setter
    private Long gdp;
    @Getter @Setter
    private Long co2;
    @Getter @Setter @Column(name="energy_per_capita")
    private Long energycapita;
    @Getter @Setter @Column(name="energy_per_gdp")
    private Long energygdp;
    @Getter @Setter
    private Long methane;
    @Getter @Setter @Column(name="nitrous_oxide")
    private Long nitrousoxide;
    @Getter @Setter @Column(name="share_of_temperature_change_from_ghg")
    private Long shareghg;
    @Getter @Setter @Column(name="temperature_change_from_ch4")
    private Long temperaturech4;
    @Getter @Setter @Column(name="temperature_change_from_co2")
    private Long temperatureco2;
    @Getter @Setter @Column(name="temperature_change_from_ghg")
    private Long temperatureghg;
    @Getter @Setter @Column(name="temperature_change_from_n2o")
    private Long temperaturen2o;
    @Getter @Setter @Column(name="total_ghg")
    private Long totalghg;

    public String getEnergyDataJSON() {
        return new EnergyData(year, energycapita, energygdp).toJson();
    }

    public String getEmissionDataJSON() {
        return new EmissionData(year, co2, methane, nitrousoxide, totalghg).toJson();
    }

    public String getTemperatureDataJSON() {
        return new TemperatureData(year, shareghg, temperaturech4,
                temperaturen2o, temperatureco2, temperatureghg).toJson();
    }

    public String getFullDataJSON() { //UPDATE
        return "toDo";
    }

    public String getGeneralDataJSON() {
        return new GeneralData(year, population, gdp).toJson();
    }

    public GeneralData getGeneralData(){
        return new GeneralData(year, population, gdp);
    }

    public EnergyData getEnergyData() {
        return new EnergyData(year, energycapita, energygdp);
    }

    public EmissionData getEmissionData() {
        return new EmissionData(year, co2, methane, nitrousoxide, totalghg);
    }

    public TemperatureData getTemperatureData() {
        return new TemperatureData(year, shareghg, temperaturech4,
                temperaturen2o, temperatureco2, temperatureghg);
    }

    //public FullData getFullData() { //UPDATE
        //return new FullData();
    //}

}
