package com.group25.webapp.model;

/**
 * The class for general data.
 */
public class GeneralData implements Data {
    private Long population;
    private Long gdp;

    /**
     * The constructor for GeneralData.
     * @param population the population
     * @param gdp the gdp
     */
    public GeneralData(Long population, Long gdp) {
        this.population = population;
        this.gdp = gdp;
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
