package com.group25.webapp.service;

import com.group25.webapp.model.ContinentEntity;
import com.group25.webapp.model.CountryEntity;
import com.group25.webapp.model.Data;
import com.group25.webapp.model.repository.ContinentRepository;
import com.group25.webapp.model.repository.CountryRepository;
import com.group25.webapp.model.repository.DataHolderRepository;
import com.group25.webapp.util.JSON;
import com.group25.webapp.util.ListManipulation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * The service class for years.
 */
@Service
public class YearService {
    //BOTH REPOSITORIES (DATAHOLDER REPO)
    @Autowired
    private ContinentRepository continentRepository;
    @Autowired
    private CountryRepository countryRepository;

    /**
     * The method gets all the years with avaliable data.
     * @return an array of years with data.
     */
    public String getYears(String order, Integer offset, Integer limit){
        List<Integer> years1 = continentRepository.findDistinctYear();
        List<Integer> years2 = countryRepository.findDistinctYear();
        List<Integer> years = ListManipulation.concatWithCollection(years1, years2);
        Collections.sort(years);

        if (order != null && order.equals("descending")) {
            Collections.reverse(years);
        }
        if (offset != null) {
            years = ListManipulation.applyOffset(years, offset);
        }
        if (limit != null) {
            years = ListManipulation.applyLimit(years, limit);
        }

        return JSON.toJson(years);
    }



    /**
     * The method gets the data
     * @param year the year of the data
     * @param dataType (0 general, 1 emission, 2 energy, 3 temperature, 4 full)
     * @return
     */
    public String JSONSpecificData(Integer year, int dataType, String order, Integer offset, Integer limit){
        List<Data> dataList = new ArrayList<>();
        List<CountryEntity> countries = countryRepository.findByYear(year);
        List<ContinentEntity> continents = continentRepository.findByYear(year);

        for(var it : countries){
            dataList.add(it.retrieveDataByType(dataType));
        }

        for(var it : continents){
            dataList.add(it.retrieveDataByType(dataType));
        }

        if (order != null && order.equals("descending")) {
            Collections.reverse(dataList);
        }
        if (offset != null) {
            dataList = ListManipulation.applyOffset(dataList, offset);
        }
        if (limit != null) {
            dataList = ListManipulation.applyLimit(dataList, limit);
        }

        return JSON.toJson(dataList);
    }




}
