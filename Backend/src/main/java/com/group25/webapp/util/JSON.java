package com.group25.webapp.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

/**
 * The Util Class for JSON serializing and deserializing.
 */
public class JSON {

    /**
     * The method converts an object to Json.
     * @param object the object to be converted
     * @return the json string
     * @param <T> the generics type
     */
    public static <T> String toJson(T object) {

        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

    }

    /**
     * The method converts a json string to an object.
     * @param json the json string
     * @param type the class of the object
     * @return the object
     * @param <T> the generics type
     */
    public static <T> T fromJson(String json, Class<T> type) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            return mapper.readValue(json, type);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }


}
