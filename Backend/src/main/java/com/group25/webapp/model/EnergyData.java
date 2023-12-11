package com.group25.webapp.model;

/**
 * The class for EnergyData.
 */
public class EnergyData implements Data {
    private Long energy_per_cap;
    private Long energy_per_ghg;

    /**
     * The constructor for EnergyData.
     * @param energy_per_cap the energy per cap
     * @param energy_per_ghg the energy per ghg
     */
    public EnergyData(Long energy_per_cap, Long energy_per_ghg) {
        this.energy_per_cap = energy_per_cap;
        this.energy_per_ghg = energy_per_ghg;
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
