package com.group25.webapp.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.Setter;

import java.io.IOException;
import java.util.List;

/**
 * The class for summaryData.
 */
public class SummaryData{
    @Getter @Setter
    private String ISO;
    @Getter @Setter
    private String name;
    @Getter @Setter
    private List<Data> data;

    /**
     * The constructor for SummaryData
     * @param ISO the iso
     * @param name the name of the data
     */
    public SummaryData(String ISO, String name, List<Data> data) {
        this.ISO = ISO;
        this.name = name;
        this.data = data;
    }


}
