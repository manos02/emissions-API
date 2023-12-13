package com.group25.webapp.model.repository;

import com.group25.webapp.model.CountryEntity;
import com.group25.webapp.model.DataHolder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * The repository interface for countries.
 */
@NoRepositoryBean
public interface DataHolderRepository <T extends DataHolder> extends JpaRepository<T, Integer> {

    DataHolder findFirstByISO(String iso_code);

    //@Query("SELECT DISTINCT ISO FROM T")
    List<String> findDistinctISO();

    @Query("SELECT DISTINCT name FROM (SELECT name from CountryEntity union all (SELECT name from ContinentEntity))")
    List<String> findDistinctCountry();

    List<CountryEntity> findByISO(String iso_code);

}
