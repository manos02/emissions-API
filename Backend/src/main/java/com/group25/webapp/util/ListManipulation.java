package com.group25.webapp.util;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Helper class for manipulating lists of any data type.
 */
public class ListManipulation {

    /**
     * The method concats two arrays together.
     *
     * @param array1 first array
     * @param array2 second array
     * @param <T>    the generics type
     * @return the concated array
     */
    public static <T> List<T> concatWithCollection(List<T> array1, List<T> array2) {
        List<T> resultList = new ArrayList<>(array1.size() + array2.size());
        resultList.addAll(array1);
        array2.removeAll(array1);
        resultList.addAll(array2);

        return resultList;
    }

    /**
     * Applies an offset filter to a list, returning all the elements except the first n.
     *
     * @param list   The list that will be offset.
     * @param offset The offset value.
     * @param <T>    The generic data type.
     */
    public static <T> List<T> applyOffset(List<T> list, int offset) {
        return list.subList(offset, list.size());
    }

    /**
     * Applies a limit filter to a list, returning only the first n elements.
     *
     * @param list  The list that will be limited.
     * @param limit The limit value.
     * @param <T>   The generic data type.
     */
    public static <T> List<T> applyLimit(List<T> list, int limit) {
        return list.subList(0, limit);
    }

    /**
     * Applies a inverse limit filter to a list, returning only the last n elements.
     *
     * @param list  The list that will be limited.
     * @param limit The limit value.
     * @param <T>   The generic data type.
     * @return The list after limiting.
     */
    public static <T> List<T> applyInverseLimit(List<T> list, int limit) {
        return list.subList(list.size() - limit, list.size());
    }

    /**
     * Applies a range filter to a list, returning only the elements withing the given range.
     *
     * @param list       The list that will be filtered.
     * @param lowerBound The lower bound of the range.
     * @param upperBound The upper bound of the range.
     * @param <T>        The generic data type.
     * @return The list after it is filtered.
     */
    public static <T> List<T> applyRange(List<T> list, int lowerBound, int upperBound) {
        return list.subList(lowerBound, upperBound);
    }
}
