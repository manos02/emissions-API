package com.group25.webapp.service;

import com.group25.webapp.model.CountryEntity;
import com.group25.webapp.model.CountryRepository;
import com.group25.webapp.model.Data;
import com.group25.webapp.model.SummaryData;
import com.group25.webapp.util.JSON;
import com.group25.webapp.util.ListManipulation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

/**
 * The service class for countries.
 */
@Service
public class CountriesService {

    @Autowired
    private CountryRepository countryRepository;

    /**
     * Generates a list of countrySummaries, returned in the order of the database.
     *
     * @return The list of countrySummaries that was generated.
     */
    private List<SummaryData> countrySummaries() {

        List<SummaryData> summaryDataList = new ArrayList<>();

        List<String> isoList = countryRepository.findDistinctISO();
        List<String> nameList = countryRepository.findDistinctCountry();

        for (int i = 0; i < nameList.size(); i++) {
            summaryDataList.add(new SummaryData(isoList.get(i), nameList.get(i)));
        }

        return summaryDataList;
    }

    /**
     * Generates a list of countrySummaries, filtered and ordered by specific parameters.
     * @param filter What the data should be sorted by.
     * @param order Whether the data is ascending or descending.
     * @param limit How many elements should be returned.
     * @param offset The offset the data should have.
     * @return The generated list of countries, in JSON format.
     */
    public String JSONcountrySummaries(String filter, String order, Integer limit, Integer offset) {
        List<SummaryData> fullData = countrySummaries();

        if (filter != null) {
            if (filter.equals("ISO")) {
                Collections.sort(fullData, Comparator.comparing(SummaryData::getISO));
            }
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
     * Generates the country summary for a country, specified by ISO.
     *
     * @param ISO The iso of the specific country.
     * @return The country summary in JSON format.
     */
    public String JSONCountrySummaryByISO(String ISO) {
        CountryEntity country = countryRepository.findFirstByISO(ISO);
        return JSON.toJson(country.getSummaryData());
    }

    public String JSONSpecificData(String ISO, int dataType){
        List<Data> dataList = new ArrayList<>();
        List<CountryEntity> countries = countryRepository.findByISO(ISO);

        for(var it : countries){
            dataList.add(it.retrieveDataByType(dataType));
        }

        return JSON.toJson(dataList);
    }

}
