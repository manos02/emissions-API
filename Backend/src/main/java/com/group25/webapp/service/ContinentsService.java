package com.group25.webapp.service;

import com.group25.webapp.errors.MyResourceNotFoundException;
import com.group25.webapp.errors.WrongQueryException;
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
     * Generates a list of continentSummaries, filtered and ordered by specific parameters.
     *
     * @param order  Whether the data is ascending or descending.
     * @param limit  How many elements should be returned.
     * @param offset The offset the data should have.
     * @return The generated list of continent summaries, in JSON format.
     */
    public String JSONContinentSummaries(String order, Integer limit, Integer offset) throws WrongQueryException {
        List<String> nameList = continentRepository.findDistinctContinent();

        nameList = basicFiltering(nameList, order, limit, offset);

        return JSON.toJson(nameList);
    }

    /**
     * Generates the continent summary for a country, specified by name.
     *
     * @param name     the name of the specific continent
     * @param dataType the datatype
     * @param order    the order
     * @param limit    the limit
     * @param offset   the offset
     * @param lower    the lower bounds of year
     * @param upper    the upper bounds of year
     * @return the summaryData with a list of datatype of the country specified by ISO
     */
    public String JSONContinentSummaryByName(String name, Integer dataType, String order, Integer limit, Integer offset, Integer lower, Integer upper) throws MyResourceNotFoundException, WrongQueryException {
        ContinentEntity continent = continentRepository.findFirstByName(name);

        if (continent == null) {
            throw new MyResourceNotFoundException();
        }

        List<Data> dataList = specificData(name, dataType);
        dataList = bounds(dataList, lower, upper);
        dataList = basicFiltering(dataList, order, limit, offset);
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
    public String JSONContinentSummaryByNameAndYear(String name, Integer year, Integer dataType) throws MyResourceNotFoundException, WrongQueryException {
        ContinentEntity continentEntity = continentRepository.findFirstByNameAndYear(name, year);
        if (continentEntity == null) {
            throw new MyResourceNotFoundException();
        }
        if (dataType != null && (dataType < 0 || dataType > 4)) {
            throw new WrongQueryException();
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
    public String JSONGetYearData(Integer year, Integer dataType, String order, Integer limit, Integer offset,
                                  Integer lower, Integer upper, String filter) throws MyResourceNotFoundException, WrongQueryException {
        List<ContinentEntity> continentFullData = continentRepository.findByYear(year);

        if (continentFullData.isEmpty()) {
            throw new MyResourceNotFoundException();
        }
        List<SummaryData> finalList = new ArrayList<>();


        for (var c : continentFullData) {
            List<Data> tempList = new ArrayList<>();
            tempList.add(c.getFullData());
            finalList.add(new SummaryData(c.getISO(), c.getName(), tempList));
        }

        finalList = boundsPop(finalList, lower, upper, filter);
        finalList = basicFiltering(finalList, order, limit, offset);

        List<SummaryData> finalfinalList = new ArrayList<>();
        for (var it : finalList) {
            List<Data> tempList = new ArrayList<>();
            tempList.add(it.retrieveFullData().retrieveDataByType(dataType));
            finalfinalList.add(new SummaryData(it.getISO(), it.getName(), tempList));
        }

        return JSON.toJson(finalfinalList);
    }

    /**
     * The method deletes data in the repository.
     *
     * @param name the ISO of the data
     * @param year the year of the data
     */
    public void deleteData(String name, Integer year) throws MyResourceNotFoundException {
        ContinentEntity continentEntity = continentRepository.findFirstByNameAndYear(name, year);
        if (continentEntity == null) {
            throw new MyResourceNotFoundException();
        }
        continentRepository.delete(continentEntity);

    }

    /**
     * The method creates a countyEntity.
     *
     * @param name     the name
     * @param jsonYear the year in json format
     */
    public void createData(String name, String jsonYear) throws MyResourceNotFoundException {
        ContinentEntity continentEntity = new ContinentEntity();
        if (continentRepository.findByName(name) == null) {
            throw new MyResourceNotFoundException();
        }
        continentEntity.setName(name);
        continentEntity.setYear(JSON.fromJson(jsonYear, int.class));
        continentRepository.save(continentEntity);
    }

    /**
     * The method updates the data in the repository.
     *
     * @param name           the name of the data
     * @param year           the year of the data
     * @param dataType       the datatype modified
     * @param updatedContinent the updated data in json format
     * @return the updated data.
     */
    public String updateData(String name, Integer year, Integer dataType, String updatedContinent) throws MyResourceNotFoundException {
        ContinentEntity continentEntity = continentRepository.findFirstByNameAndYear(name, year);

        if (continentEntity == null) {
            throw new MyResourceNotFoundException();
        }
        if (dataType == null) {
            dataType = 4;
        }

        Data data = null;

        switch (dataType) {
            case 0 -> {
                data = JSON.fromJson(updatedContinent, GeneralData.class);
                continentEntity.setGeneralData((GeneralData) data);
            }
            case 1 -> {
                data = JSON.fromJson(updatedContinent, EmissionData.class);
                continentEntity.setEmissionData((EmissionData) data);
            }
            case 2 -> {
                data = JSON.fromJson(updatedContinent, EnergyData.class);
                continentEntity.setEnergyData((EnergyData) data);
            }
            case 3 -> {
                data = JSON.fromJson(updatedContinent, TemperatureData.class);
                continentEntity.setTemperatureData((TemperatureData) data);
            }
            case 4 -> {
                data = JSON.fromJson(updatedContinent, FullData.class);
                continentEntity.setFullData((FullData) data);
            }
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
    public List<Data> bounds(List<Data> dataList, Integer lower, Integer upper) throws WrongQueryException {
        dataList.sort(Comparator.comparing(Data::getYear));

        if (lower != null) {
            if (lower < 0) {
                throw new WrongQueryException();
            }
            dataList.removeIf((Data data) -> data.getYear() < lower);
        }
        Collections.reverse(dataList);
        if (upper != null) {
            if (upper < 0) {
                throw new WrongQueryException();
            }
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
     * @param filter filter to be sorted
     * @return the list
     */
    public List<SummaryData> boundsPop(List<SummaryData> dataList, Integer lower, Integer upper, String filter) throws WrongQueryException {
        if (filter != null) {
            if (filter.equals("pop")) {
                dataList.sort(Comparator.comparing(SummaryData::retrieveFullDataPopulation));
            } else {
                throw new WrongQueryException();
            }
        }

        if (lower != null) {
            if (lower < 0) {
                throw new WrongQueryException();
            }
            dataList.removeIf((SummaryData data) -> data.retrieveFullData().population() < lower);
        }
        Collections.reverse(dataList);
        if (upper != null) {
            if (upper < 0) {
                throw new WrongQueryException();
            }
            dataList.removeIf((SummaryData data) -> data.retrieveFullData().population() > upper);
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
    public <T> List<T> basicFiltering(List<T> dataList, String order, Integer limit, Integer offset) throws WrongQueryException {
        if (order != null && !order.equals("ascending")) {
            if (!order.equals("descending")) {
                throw new WrongQueryException();
            }
            Collections.reverse(dataList);
        }
        if (offset != null) {
            if (offset > dataList.size()) {
                throw new WrongQueryException();
            }
            dataList = ListManipulation.applyOffset(dataList, offset);
        }
        if (limit != null) {
            if (limit < 0 || limit > dataList.size()) {
                throw new WrongQueryException();
            }
            dataList = ListManipulation.applyLimit(dataList, limit);
        }
        return dataList;
    }

    /**
     * The method gets all the specified dataType of a specific ISO.
     *
     * @param name     the name
     * @param dataType the dataType
     * @return the list of Data for a ISO
     */
    public List<Data> specificData(String name, Integer dataType) throws WrongQueryException {

        if (dataType != null && (dataType < 0 || dataType > 4)) {
            throw new WrongQueryException();
        }

        List<Data> dataList = new ArrayList<>();
        List<ContinentEntity> countries = continentRepository.findByName(name);


        for (var it : countries) {
            dataList.add(it.retrieveDataByType(dataType));
        }
        return dataList;
    }


}




