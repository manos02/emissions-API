package com.group25.webapp.util;

import java.util.List;

/**
 * Helper class for manipulating lists of any data type.
 */
public class ListManipulation {

    /**
     * Applies an offset filter to a list, returning all the elements except the first n.
     * @param list The list that will be offset.
     * @param offset The offset value.
     * @param <T> The generic data type.
     */
    public static <T> List<T> applyOffset(List<T> list, int offset){
        return list.subList(offset, list.size());
    }

    /**
     * Applies a limit filter to a list, returning only the first n elements.
     * @param list The list that will be limited.
     * @param limit The limit value.
     * @param <T> The generic data type.
     */
    public static <T> List<T> applyLimit(List<T> list, int limit){
        return list.subList(0, limit);
    }

    /**
     * Applies a inverse limit filter to a list, returning only the last n elements.
     * @param list The list that will be limited.
     * @param limit The limit value.
     * @return The list after limiting.
     * @param <T> The generic data type.
     */
    public static <T> List<T> applyInverseLimit(List<T> list, int limit){
        return list.subList(list.size() - limit, list.size());
    }

    /**
     * Applies a range filter to a list, returning only the elements withing the given range.
     * @param list The list that will be filtered.
     * @param lowerBound The lower bound of the range.
     * @param upperBound The upper bound of the range.
     * @return The list after it is filtered.
     * @param <T> The generic data type.
     */
    public static <T> List<T> applyRange(List<T> list, int lowerBound, int upperBound){
        return list.subList(lowerBound, upperBound);
    }
}
