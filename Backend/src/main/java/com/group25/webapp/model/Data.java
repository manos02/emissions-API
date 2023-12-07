package com.group25.webapp.model;

/**
 * The interface for data.
 */
public interface Data {

    String toJson();
    Data fromJson(String json);

}
