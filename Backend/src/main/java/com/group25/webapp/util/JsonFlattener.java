package com.group25.webapp.util;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Class for flattening Json data into a flat map.
 */
public class JsonFlattener {

    /**
     * Flattens a JSON string into a flat map.
     *
     * @param jsonStr The input JSON string to be flattened.
     * @return A flat map representation of the input JSON.
     * @throws Exception If an error occurs during the flattening process.
     */
    public static Map<String, Object> flattenJson(String jsonStr) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(jsonStr);

        Map<String, Object> flatMap = new LinkedHashMap<>();
        flatten(rootNode, "", flatMap);
        return flatMap;
    }

    private static void flatten(JsonNode node, String prefix, Map<String, Object> flatMap) {
        if (node.isObject()) {
            Iterator<Map.Entry<String, JsonNode>> iter = node.fields();
            String newPrefix = prefix.isEmpty() ? "" : prefix + "_";

            while (iter.hasNext()) {
                Map.Entry<String, JsonNode> entry = iter.next();
                flatten(entry.getValue(), newPrefix + entry.getKey(), flatMap);
            }
        } else if (node.isArray()) {
            int index = 0;
            for (JsonNode arrayItem : node) {
                flatten(arrayItem, prefix + "[" + index + "]", flatMap);
                index++;
            }
        } else {
            flatMap.put(prefix, node.asText());
        }
    }
}
