package com.group25.webapp.service;

import com.group25.webapp.model.*;
import com.group25.webapp.model.repository.ContinentRepository;
import com.group25.webapp.util.JSON;
import com.group25.webapp.util.ListManipulation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

/**
 * The service class for continents.
 */
@Service
public class ContinentsService {

    @Autowired
    private ContinentRepository continentRepository;

    /**
     * Generates a list of continentSummaries, returned in the order of the database.
     *
     * @return The list of continentSummaries that was generated.
     */
    private List<SummaryData> continentSummaries() {

        List<SummaryData> summaryDataList = new ArrayList<>();

        List<String> isoList = continentRepository.findDistinctISO();
        List<String> nameList = continentRepository.findDistinctContinent();

        for (int i = 0; i < nameList.size(); i++) {
            summaryDataList.add(new SummaryData(isoList.get(i), nameList.get(i)));
        }

        return summaryDataList;
    }

    /**
     * Generates a list of countrySummaries, filtered and ordered by specific parameters.
     * @
     * @return The generated list of countries, in JSON format.
     */
    public String JSONContinentSummaries(String filter, String order, Integer limit, Integer offset) {
        List<SummaryData> fullData = continentSummaries();

        if (filter != null) {
            if (filter.equals("name")) {
                Collections.sort(fullData, Comparator.comparing(SummaryData::getName));
            }
        }

        if (order != null && order.equals("descending")) {
            Collections.reverse(fullData);
        }
        if (offset != null) {
            fullData = ListManipulation.applyOffset(fullData, offset);
        }
        if (limit != null) {
            fullData = ListManipulation.applyLimit(fullData, limit);
        }

        return JSON.toJson(fullData);
    }

    /**
     * Generates the country summary for a continent, specified by ISO.
     *
     * @param name The name of the specific continent.
     * @return The continent summary in JSON format.
     */
    public String JSONContinentSummaryByName(String name) {
        ContinentEntity continent = continentRepository.findFirstByISO(name);
        return JSON.toJson(continent.getSummaryData());
    }

//    public String JSONContinentSpecificData(String name, int dataType) {
//        List<Data> dataList = new ArrayList<>();
//        List<CountryEntity> continents = continentRepository.findByName(name);
//
//        for(var it : continents){
//            dataList.add(it.retrieveDataByType(dataType));
//        }
//
//        return JSON.toJson(dataList);
//    }

}




