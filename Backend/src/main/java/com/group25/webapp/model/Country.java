package com.group25.webapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

/**
 * The class for a country.
 */
@Entity
@Table(name = "meal")
public class Country{
    private String name;
    @Id
    private String ISO;
//    private FullData fullData;
//
//    public FullData getFullData() {
//        return fullData;
//    }
//
//    public void setFullData(FullData fullData) {
//        this.fullData = fullData;
//    }

    public String getName() {
        return name;
    }

    public void setISO(String ISO) {
        this.ISO = ISO;
    }

    public String getISO() {
        return ISO;
    }

    public void setName(String name) {
        this.name = name;
    }
}
