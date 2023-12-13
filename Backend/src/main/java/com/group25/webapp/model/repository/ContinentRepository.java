package com.group25.webapp.model.repository;

import com.group25.webapp.model.ContinentEntity;
import com.group25.webapp.model.CountryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * The repository interface for continents.
 */
@Repository
public interface ContinentRepository extends JpaRepository<ContinentEntity, Integer> {
    ContinentEntity findFirstByISO(String iso_code);

    @Query("SELECT DISTINCT ISO FROM ContinentEntity")
    List<String> findDistinctISO();



    @Query("SELECT DISTINCT name FROM ContinentEntity")
    List<String> findDistinctContinent();

    @Query("SELECT DISTINCT year FROM ContinentEntity")
    List<Integer> findDistinctYear();

    List<ContinentEntity> findByISO(String iso_code);

    List<ContinentEntity> findByYear(Integer year);


}
