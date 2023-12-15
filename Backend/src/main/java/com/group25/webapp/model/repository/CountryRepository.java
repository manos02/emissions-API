package com.group25.webapp.model.repository;

import com.group25.webapp.model.entities.CountryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * The repository interface for countries.
 */
@Repository
public interface CountryRepository extends JpaRepository<CountryEntity, Integer> {

    CountryEntity findFirstByISO(String iso_code);

    CountryEntity findFirstByISOAndYear(String iso_code, Integer year);

    @Query("SELECT DISTINCT ISO FROM CountryEntity")
    List<String> findDistinctISO();

    @Query("SELECT DISTINCT name FROM CountryEntity")
    List<String> findDistinctCountry();

    List<CountryEntity> findByISO(String iso_code);

    List<CountryEntity> findByYear(Integer year);

    @Query("SELECT DISTINCT year FROM CountryEntity ")
    List<Integer> findDistinctYear();

}
