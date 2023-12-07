package com.group25.webapp.model;

import com.group25.webapp.model.dataView.*;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Entity
public class CountryEntity implements EnergyDataView, EmissionDataView, FullDataView, GeneralDataView,
        TemperatureDataView {

    @Id @GeneratedValue
    @Getter
    private Long id;
    @Getter @Setter
    private String country;
    @Getter @Setter
    private Integer year;
    @Getter @Setter
    private String iso_code;
    @Getter @Setter
    private Long population;
    @Getter @Setter
    private Long gdp;
    @Getter @Setter
    private Long co2;
    @Getter @Setter
    private Long energy_per_capita;
    @Getter @Setter
    private Long energy_per_gdp;
    @Getter @Setter
    private Long methane;
    @Getter @Setter
    private Long nitrous_oxide;
    @Getter @Setter
    private Long share_of_temperature_change_from_ghg;
    @Getter @Setter
    private Long temperature_change_from_ch4;
    @Getter @Setter
    private Long temperature_change_from_co2;
    @Getter @Setter
    private Long temperature_change_from_ghg;
    @Getter @Setter
    private Long temperature_change_from_n2o;
    @Getter @Setter
    private Long total_ghg;

    public String getEnergyData(){
        return new EnergyData(energy_per_capita, energy_per_gdp).toJson();
    }

    public String getEmissionData(){
        return new EmissionData(co2, methane, nitrous_oxide, total_ghg).toJson();
    }

    public String getTemperatureData(){
        return new TemperatureData(share_of_temperature_change_from_ghg, temperature_change_from_ch4,
                temperature_change_from_n2o, temperature_change_from_co2, temperature_change_from_ghg).toJson();
    }

    public String getFullData(){ //UPDATE
        return "toDo";
    }

    public String getGeneralData(){
        return new GeneralData(population, gdp).toJson();
    }

}
