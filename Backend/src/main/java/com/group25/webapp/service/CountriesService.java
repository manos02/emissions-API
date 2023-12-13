package com.group25.webapp.service;

import com.group25.webapp.model.*;
import com.group25.webapp.model.repository.CountryRepository;
import com.group25.webapp.util.JSON;
import com.group25.webapp.util.ListManipulation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

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
            summaryDataList.add(new SummaryData(isoList.get(i), nameList.get(i), null));
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

//    /**
//     * Generates the country summary for a country, specified by ISO.
//     *
//     * @param ISO The iso of the specific country.
//     * @return The country summary in JSON format.
//     */
//    public String JSONCountrySummaryByISO(String ISO) {
//        CountryEntity country = countryRepository.findFirstByISO(ISO);
//        return JSON.toJson(country.getSummaryData());
//    }

    /**
     * Generates the country summary for a country, specified by ISO.
     *
     * @param ISO The iso of the specific country.
     * @return The country summary in JSON format.
     */
    public String JSONCountrySummaryByISO(String ISO, Integer dataType, String order, Integer limit, Integer offset, Integer lower, Integer upper) {
        CountryEntity country = countryRepository.findFirstByISO(ISO);
        List<Data> dataList = specificData(ISO, dataType);

        bounds(dataList, lower, upper);

        basicFiltering(dataList, order, limit, offset);
        SummaryData summaryData = new SummaryData(ISO, country.getName(), dataList);

        return JSON.toJson(summaryData);
    }

    public String JSONCountrySummaryByISOAndYear(String ISO, Integer year, Integer dataType){
        CountryEntity countryEntity = countryRepository.findFirstByISOAndYear(ISO, year);
        Data data = countryEntity.retrieveDataByType(dataType);


        return JSON.toJson(data);
    }

    public String JSONGetYearData(Integer year, Integer dataType, String order, Integer limit, Integer offset, Integer lower, Integer upper){
        List<FullData> dataList = specificDataByYear(year);
        List<Data> finalList = new ArrayList<>();

        boundsPop(dataList, lower, upper);

        basicFiltering(dataList, order, limit, offset);

        for(var it : dataList){
            finalList.add(it.retrieveDataByType(dataType));
        }

        return JSON.toJson(finalList);
    }

    public List<Data> bounds(List<Data> dataList, Integer lower, Integer upper){
        Collections.sort(dataList, Comparator.comparing(Data::getYear));

        if(dataList==null){
            return null;
        }

        if(lower!=null) {
            dataList.removeIf((Data data) -> data.getYear() < lower);
        }
        Collections.reverse(dataList);
        if(upper!=null){
            dataList.removeIf((Data data) -> data.getYear() > upper);
        }
        Collections.reverse(dataList);

        return dataList;

    }

    public void createData(String ISO, String jsonYear){
        CountryEntity countryEntity = new CountryEntity();
        countryEntity.setISO(ISO);
        countryEntity.setName(countryRepository.findFirstByISO(ISO).getName());
        countryEntity.setYear(JSON.fromJson(jsonYear, int.class));

        countryRepository.save(countryEntity);

    }

    public String updateData(String ISO, Integer year, Integer dataType, String updatedCountry){
        CountryEntity countryEntity = countryRepository.findFirstByISOAndYear(ISO, year);
        Data data = null;

        switch(dataType){
            case 0:
                data = JSON.fromJson(updatedCountry, GeneralData.class);
                countryEntity.setGeneralData((GeneralData) data);
                break;
            case 1:
                data = JSON.fromJson(updatedCountry, EmissionData.class);
                countryEntity.setEmissionData((EmissionData) data);
                break;
            case 2:
                data = JSON.fromJson(updatedCountry, EnergyData.class);
                countryEntity.setEnergyData((EnergyData) data);
                break;
            case 3:
                data = JSON.fromJson(updatedCountry, TemperatureData.class);
                countryEntity.setTemperatureData((TemperatureData) data);
                break;
            case 4:
                data = JSON.fromJson(updatedCountry, FullData.class);
                countryEntity.setFullData((FullData) data);
                break;
        }

        countryRepository.save(countryEntity);

        return JSON.toJson(data);
    }

    public List<FullData> boundsPop(List<FullData> dataList, Integer lower, Integer upper){
        Collections.sort(dataList, Comparator.comparing(FullData::population));

        if(dataList==null){
            return null;
        }

        if(lower!=null) {
            dataList.removeIf((FullData data) -> data.population() < lower);
        }
        Collections.reverse(dataList);
        if(upper!=null){
            dataList.removeIf((FullData data) -> data.population() > upper);
        }
        Collections.reverse(dataList);

        return dataList;

    }

    public <T> List<T> basicFiltering(List<T> dataList, String order, Integer limit, Integer offset){
        if (order != null && order.equals("descending")) {
            Collections.reverse(dataList);
        }
        if (offset != null) {
            dataList = ListManipulation.applyOffset(dataList, offset);
        }
        if (limit != null) {
            dataList = ListManipulation.applyLimit(dataList, limit);
        }
        return dataList;
    }

    public List<Data> specificData(String ISO, Integer dataType){
        List<Data> dataList = new ArrayList<>();
        List<CountryEntity> countries = countryRepository.findByISO(ISO);

        for(var it : countries){
            dataList.add(it.retrieveDataByType(dataType));
        }
        return dataList;
    }

    public List<FullData> specificDataByYear(Integer year){
        List<FullData> dataList = new ArrayList<>();
        List<CountryEntity> countries = countryRepository.findByYear(year);

        for(var it : countries){
            dataList.add(it.getFullData());
        }
        return dataList;
    }

    public String JSONSpecificData(String ISO, Integer dataType){

        return JSON.toJson(specificData(ISO, dataType));
    }

}
