package com.group25.webapp.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.Setter;

import java.io.IOException;

/**
 * The class for summaryData.
 */
public class SummaryData implements Data{
    @Getter @Setter
    private String ISO;
    @Getter @Setter
    private String name;

    /**
     * The constructor for SummaryData
     * @param ISO the iso
     * @param name the name of the data
     */
    public SummaryData(String ISO, String name) {
        this.ISO = ISO;
        this.name = name;
    }

    @Override
    public String toJson() {

        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public Data fromJson(String json) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.readValue(json, this.getClass());
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
