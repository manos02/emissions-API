package com.group25.webapp.model.data;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * The class for summaryData.
 */
public class SummaryData {
    @Getter
    @Setter
    private String ISO;
    @Getter
    @Setter
    private String name;
    @Getter
    @Setter
    private List<Data> data;

    /**
     * The constructor for SummaryData
     *
     * @param ISO  the iso
     * @param name the name of the data
     */
    public SummaryData(String ISO, String name, List<Data> data) {
        this.ISO = ISO;
        this.name = name;
        this.data = data;
    }

    public FullData retriveFullData(){
        return (FullData)data.get(0);
    }

    public Long retriveFullDataPopulation(){
        return ((FullData)data.get(0)).population();
    }


}
