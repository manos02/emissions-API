package com.group25.webapp.service;

import com.group25.webapp.errors.NotFound;
import com.group25.webapp.model.data.*;
import com.group25.webapp.model.entities.ContinentEntity;
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
     * Generates a list of countrySummaries, returned in the order of the database.
     *
     * @return The list of countrySummaries that was generated.
     */
    private List<String> continentSummaries() {
        return continentRepository.findDistinctContinent();
    }

    /**
     * Generates a list of countrySummaries, filtered and ordered by specific parameters.
     *
     * @param filter What the data should be sorted by.
     * @param order  Whether the data is ascending or descending.
     * @param limit  How many elements should be returned.
     * @param offset The offset the data should have.
     * @return The generated list of countries summaries, in JSON format.
     */
    public String JSONContinentSummaries(String filter, String order, Integer limit, Integer offset) {
        List<String> nameList = continentSummaries();

        if (filter != null) {
            if (filter.equals("name")) {
                Collections.sort(nameList);
            }
        }

        basicFiltering(nameList, order, limit, offset);

        return JSON.toJson(nameList);
    }

    /**
     * Generates the country summary for a country, specified by ISO.
     *
     * @param name     the name of the specific country
     * @param dataType the datatype
     * @param order    the order
     * @param limit    the limit
     * @param offset   the offset
     * @param lower    the lower bounds of year
     * @param upper    the upper bounds of year
     * @return the summaryData with a list of datatype of the country specified by ISO
     */
    public String JSONContinentSummaryByName(String name, Integer dataType, String order, Integer limit, Integer offset, Integer lower, Integer upper) throws NotFound {
        ContinentEntity continent = continentRepository.findFirstByName(name);

        if (continent == null) {
            throw new NotFound();
        }

        List<Data> dataList = specificData(name, dataType);

        bounds(dataList, lower, upper);

        basicFiltering(dataList, order, limit, offset);
        SummaryData summaryData = new SummaryData(name, continent.getName(), dataList);

        return JSON.toJson(summaryData);
    }

    /**
     * The method gets the country summary by ISO and year in json format.
     *
     * @param name     the name
     * @param year     the year
     * @param dataType the datatype
     * @return the data in json
     */
    public String JSONContinentSummaryByNameAndYear(String name, Integer year, Integer dataType) throws NotFound {
        ContinentEntity continentEntity = continentRepository.findFirstByNameAndYear(name, year);
        if (continentEntity == null) {
            throw new NotFound();
        }

        Data data = continentEntity.retrieveDataByType(dataType);

        return JSON.toJson(data);
    }

    /**
     * The method gets data based on a year in json format.
     *
     * @param year     the year
     * @param dataType the datatype
     * @param order    the order
     * @param limit    the limit
     * @param offset   the offset
     * @param lower    the lower bounds of population
     * @param upper    the upper bounds of population
     * @return list of data in json
     */
    public String JSONGetYearData(Integer year, Integer dataType, String order, Integer limit, Integer offset, Integer lower, Integer upper) throws NotFound {
        List<FullData> dataList = fullDataByYear(year);
        List<Data> finalList = new ArrayList<>();

        if (dataList.isEmpty()) {
            throw new NotFound();
        }

        boundsPop(dataList, lower, upper);

        basicFiltering(dataList, order, limit, offset);

        for (var it : dataList) {
            finalList.add(it.retrieveDataByType(dataType));
        }

        return JSON.toJson(finalList);
    }

    /**
     * The method deletes data in the repository.
     *
     * @param name the ISO of the data
     * @param year the year of the data
     */
    public void deleteData(String name, Integer year) {
        ContinentEntity continentEntity = continentRepository.findFirstByNameAndYear(name, year);
        continentRepository.delete(continentEntity);

    }

    /**
     * The method creates a countyEntity.
     *
     * @param name     the name
     * @param jsonYear the year in json format
     */
    public void createData(String name, String jsonYear) {
        ContinentEntity continentEntity = new ContinentEntity();
        continentEntity.setName(continentRepository.findFirstByName(name).getName());
        continentEntity.setYear(JSON.fromJson(jsonYear, int.class));

        continentRepository.save(continentEntity);

    }

    /**
     * The method updates the data in the repository.
     *
     * @param name           the name of the data
     * @param year           the year of the data
     * @param dataType       the datatype modified
     * @param updatedCountry the updated data in json format
     * @return the updated data.
     */
    public String updateData(String name, Integer year, Integer dataType, String updatedCountry) {
        ContinentEntity continentEntity = continentRepository.findFirstByNameAndYear(name, year);
        Data data = null;

        switch (dataType) {
            case 0:
                data = JSON.fromJson(updatedCountry, GeneralData.class);
                continentEntity.setGeneralData((GeneralData) data);
                break;
            case 1:
                data = JSON.fromJson(updatedCountry, EmissionData.class);
                continentEntity.setEmissionData((EmissionData) data);
                break;
            case 2:
                data = JSON.fromJson(updatedCountry, EnergyData.class);
                continentEntity.setEnergyData((EnergyData) data);
                break;
            case 3:
                data = JSON.fromJson(updatedCountry, TemperatureData.class);
                continentEntity.setTemperatureData((TemperatureData) data);
                break;
            case 4:
                data = JSON.fromJson(updatedCountry, FullData.class);
                continentEntity.setFullData((FullData) data);
                break;
        }

        continentRepository.save(continentEntity);

        return JSON.toJson(data);
    }

    /**
     * The method bounds a list by year.
     *
     * @param dataList the list of data
     * @param lower    the lower limit
     * @param upper    the upper limit
     * @return the list
     */
    public List<Data> bounds(List<Data> dataList, Integer lower, Integer upper) {
        Collections.sort(dataList, Comparator.comparing(Data::getYear));

        if (lower != null) {
            dataList.removeIf((Data data) -> data.getYear() < lower);
        }
        Collections.reverse(dataList);
        if (upper != null) {
            dataList.removeIf((Data data) -> data.getYear() > upper);
        }
        Collections.reverse(dataList);

        return dataList;
    }

    /**
     * The method bounds a list by population.
     *
     * @param dataList the list of fulldata
     * @param lower    the lower limit
     * @param upper    the upper limit
     * @return the list
     */
    public List<FullData> boundsPop(List<FullData> dataList, Integer lower, Integer upper) {
        Collections.sort(dataList, Comparator.comparing(FullData::population));

        if (lower != null) {
            dataList.removeIf((FullData data) -> data.population() < lower);
        }
        Collections.reverse(dataList);
        if (upper != null) {
            dataList.removeIf((FullData data) -> data.population() > upper);
        }
        Collections.reverse(dataList);

        return dataList;

    }

    /**
     * The method provides basic filtering for a list.
     *
     * @param dataList the list
     * @param order    the order (ascending or descending)
     * @param limit    the limit
     * @param offset   the offset
     * @param <T>      the generic type T
     * @return the list filtered by the parameters
     */
    public <T> List<T> basicFiltering(List<T> dataList, String order, Integer limit, Integer offset) {
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
     *
     * @param name     the ISO
     * @param dataType the dataType
     * @return the list of Data for a ISO
     */
    public List<Data> specificData(String name, Integer dataType) {
        List<Data> dataList = new ArrayList<>();
        List<ContinentEntity> continents = continentRepository.findByName(name);


        for (var it : continents) {
            dataList.add(it.retrieveDataByType(dataType));
        }
        return dataList;
    }

    /**
     * The method gets all the full data of a year.
     *
     * @param year the year of the data
     * @return the list of fulldata
     */
    public List<FullData> fullDataByYear(Integer year) {
        List<FullData> dataList = new ArrayList<>();
        List<ContinentEntity> continentEntities = continentRepository.findByYear(year);

        for (var it : continentEntities) {
            dataList.add(it.getFullData());
        }
        return dataList;
    }

}




