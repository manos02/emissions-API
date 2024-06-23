package com.group25.webapp.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.csv.CsvMapper;
import com.fasterxml.jackson.dataformat.csv.CsvSchema;

import java.util.Map;

/**
 * Converts data from json to csv.
 */

public class JsonToCsv {
    protected CsvMapper csvMapper = new CsvMapper();
    protected ObjectMapper jsonMapper = new ObjectMapper();

    /**
     *
     *
     * @param json to be converted.
     * @return csv format.
     * @throws Exception if an error occurs during the conversion.
     */
    public String convert(String json) throws Exception {
        Map<String, Object> flatJson = JsonFlattener.flattenJson(json);
        CsvMapper csvMapper = new CsvMapper();
        CsvSchema.Builder schemaBuilder = CsvSchema.builder();

        flatJson.keySet().forEach(schemaBuilder::addColumn);
        CsvSchema schema = schemaBuilder.build().withHeader();

        return csvMapper.writer(schema).writeValueAsString(flatJson);
    }

}
