package com.group25.webapp.model;

import com.group25.webapp.model.dataView.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

/**
 * The class for the country entity.
 */
@Slf4j
@Entity
@Table (name = "countries")
public class CountryEntity extends DataHolder {

}
