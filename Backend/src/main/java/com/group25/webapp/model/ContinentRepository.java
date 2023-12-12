package com.group25.webapp.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * The repository interface for continents.
 */
public interface ContinentRepository extends JpaRepository<ContinentEntity, Integer> {
    ContinentEntity findFirstByISO(String iso_code);

    @Query("SELECT DISTINCT ISO FROM ContinentEntity")
    List<String> findDistinctISO();

    @Query("SELECT DISTINCT name FROM ContinentEntity")
    List<String> findDistinctContinent();

    List<ContinentEntity> findByISO(String iso_code);

}
