package com.group25.webapp.model;

/**
 * The class for temperature data.
 */
public class TemperatureData implements Data {
    private Long shares;
    private Long change_ch4;
    private Long change_n20;
    private Long change_co2;
    private Long change_ghg;

    /**
     * The constructor for TemperatureData.
     * @param shares the shares
     * @param change_ch4 the change from ch4
     * @param change_n20 the change from n20
     * @param change_co2 the change from co2
     * @param change_ghg the change from ghg
     */
    public TemperatureData(Long shares, Long change_ch4, Long change_n20, Long change_co2, Long change_ghg) {
        this.shares = shares;
        this.change_ghg = change_ghg;
        this.change_ch4 = change_ch4;
        this.change_co2 = change_co2;
        this.change_n20 = change_n20;
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
