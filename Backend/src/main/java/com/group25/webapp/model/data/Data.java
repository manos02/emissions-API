package com.group25.webapp.model.data;

/**
 * The interface for data.
 */
public interface Data {

    String toJson();
    Data fromJson(String json);

    Integer getYear();

}
