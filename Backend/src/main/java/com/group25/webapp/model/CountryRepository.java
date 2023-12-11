package com.group25.webapp.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CountryRepository extends JpaRepository<CountryEntity, Integer> {

    CountryEntity findFirstByISO(String iso_code);

    @Query("SELECT DISTINCT ISO FROM CountryEntity")
    List<String> findDistinctISO();

    @Query("SELECT DISTINCT country FROM CountryEntity")
    List<String> findDistinctCountry();

//    @Query("SELECT * FROM CountryEntity WHERE ISO = iso_code")
//    List<CountryEntity> findGeneralData(String iso_code);

    List<CountryEntity> findByISO(String iso_code);

}
