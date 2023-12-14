package com.group25.webapp.service;

import com.group25.webapp.errors.NotFound;
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
     * @return The generated list of countries summaries, in JSON format.
     */
    public String JSONCountrySummaries(String filter, String order, Integer limit, Integer offset) {
        List<SummaryData> fullData = countrySummaries();

        if (filter != null) {
            if (filter.equals("ISO")) {
                Collections.sort(fullData, Comparator.comparing(SummaryData::getISO));
            }
            if (filter.equals("name")) {
                Collections.sort(fullData, Comparator.comparing(SummaryData::getName));
            }
        }

        basicFiltering(fullData, order, limit, offset);

        return JSON.toJson(fullData);
    }

    /**
     * Generates the country summary for a country, specified by ISO.
     * @param ISO the iso fo the specific country
     * @param dataType the datatype
     * @param order the order
     * @param limit the limit
     * @param offset the offset
     * @param lower the lower bounds of year
     * @param upper the upper bounds of year
     * @return the summaryData with a list of datatype of the country specified by ISO
     */
    public String JSONCountrySummaryByISO(String ISO, Integer dataType, String order, Integer limit, Integer offset,
                                          Integer lower, Integer upper) throws NotFound {
        CountryEntity country = countryRepository.findFirstByISO(ISO);

        if(country == null){
            throw new NotFound();
        }

        List<Data> dataList = specificData(ISO, dataType);

        bounds(dataList, lower, upper);

        basicFiltering(dataList, order, limit, offset);
        SummaryData summaryData = new SummaryData(ISO, country.getName(), dataList);

        return JSON.toJson(summaryData);
    }

    /**
     * The method gets the country summary by ISO and year in json format.
     * @param ISO the ISO
     * @param year the year
     * @param dataType the datatype
     * @return the data in json
     */
    public String JSONCountrySummaryByISOAndYear(String ISO, Integer year, Integer dataType) throws NotFound{
        CountryEntity countryEntity = countryRepository.findFirstByISOAndYear(ISO, year);

        if(countryEntity == null){
            throw new NotFound();
        }

        Data data = countryEntity.retrieveDataByType(dataType);

        return JSON.toJson(data);
    }

    /**
     * The method gets data based on a year in json format.
     * @param year the year
     * @param dataType the datatype
     * @param order the order
     * @param limit the limit
     * @param offset the offset
     * @param lower the lower bounds of population
     * @param upper the upper bounds of population
     * @return list of data in json
     */
    public String JSONGetYearData(Integer year, Integer dataType, String order, Integer limit, Integer offset,
                                  Integer lower, Integer upper) throws NotFound{
        List<FullData> dataList = fullDataByYear(year);
        if(dataList.isEmpty()){
            throw new NotFound();
        }

        List<Data> finalList = new ArrayList<>();

        boundsPop(dataList, lower, upper);

        basicFiltering(dataList, order, limit, offset);

        for(var it : dataList){
            finalList.add(it.retrieveDataByType(dataType));
        }

        return JSON.toJson(finalList);
    }

    /**
     * The method deletes data in the repository.
     * @param ISO the ISO of the data
     * @param year the year of the data
     */
    public void deleteData(String ISO, Integer year){
        CountryEntity countryEntity = countryRepository.findFirstByISOAndYear(ISO, year);
        countryRepository.delete(countryEntity);

    }

    /**
     * The method creates a countyEntity.
     * @param ISO the iso
     * @param jsonYear the year in json format
     */
    public void createData(String ISO, String jsonYear){
        CountryEntity countryEntity = new CountryEntity();
        countryEntity.setISO(ISO);
        countryEntity.setName(countryRepository.findFirstByISO(ISO).getName());
        countryEntity.setYear(JSON.fromJson(jsonYear, int.class));

        countryRepository.save(countryEntity);

    }

    /**
     * The method updates the data in the repository.
     * @param ISO the ISO of the data
     * @param year the year of the data
     * @param dataType the datatype modified
     * @param updatedCountry the updated data in json format
     * @return the updated data.
     */
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

    /**
     * The method bounds a list by year.
     * @param dataList the list of data
     * @param lower the lower limit
     * @param upper the upper limit
     * @return the list
     */
    public List<Data> bounds(List<Data> dataList, Integer lower, Integer upper){
        Collections.sort(dataList, Comparator.comparing(Data::getYear));

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

    /**
     * The method bounds a list by population.
     * @param dataList the list of fulldata
     * @param lower the lower limit
     * @param upper the upper limit
     * @return the list
     */
    public List<FullData> boundsPop(List<FullData> dataList, Integer lower, Integer upper){
        Collections.sort(dataList, Comparator.comparing(FullData::population));

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

    /**
     * The method provides basic filtering for a list.
     * @param dataList the list
     * @param order the order (ascending or descending)
     * @param limit the limit
     * @param offset the offset
     * @return the list filtered by the parameters
     * @param <T> the generic type T
     */
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

    /**
     * The method gets all the specified dataType of a specific ISO.
     * @param ISO the ISO
     * @param dataType the dataType
     * @return the list of Data for a ISO
     */
    public List<Data> specificData(String ISO, Integer dataType){
        List<Data> dataList = new ArrayList<>();
        List<CountryEntity> countries = countryRepository.findByISO(ISO);

        for(var it : countries){
            dataList.add(it.retrieveDataByType(dataType));
        }
        return dataList;
    }

    /**
     * The method gets all the full data of a year.
     * @param year the year of the data
     * @return the list of fulldata
     */
    public List<FullData> fullDataByYear(Integer year){
        List<FullData> dataList = new ArrayList<>();
        List<CountryEntity> countries = countryRepository.findByYear(year);

        for(var it : countries){
            dataList.add(it.getFullData());
        }
        return dataList;
    }

}
