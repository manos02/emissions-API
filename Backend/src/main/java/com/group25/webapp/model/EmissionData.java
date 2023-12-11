package com.group25.webapp.model;

/**
 * The Class for EmissionData
 */
public class EmissionData implements Data {
    private Long co2;
    private Long ch4;
    private Long n20;
    private Long ghg;

    /**
     * The constructor for EmissionData
     * @param co2 the co2
     * @param ch4 the ch4
     * @param n20 the n20
     * @param ghg the ghg
     */
    public EmissionData(Long co2, Long ch4, Long n20, Long ghg) {
        this.co2 = co2;
        this.ch4 = ch4;
        this.n20 = n20;
        this.ghg = ghg;
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
