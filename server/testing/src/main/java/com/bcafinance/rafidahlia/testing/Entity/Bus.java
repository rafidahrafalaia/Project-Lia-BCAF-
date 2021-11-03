package com.bcafinance.rafidahlia.testing.Entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
//import javax.validation.constraints.NotBlank;


@Entity
public class Bus {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name ="uuid2", strategy = "uuid2")

//    @NotNull
    private String id;

    private String code;
    private int capacity;
//    @NotBlank
    private String make;
//    @NotNull
    private String agency;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public String getMake() {
        return make;
    }

    public void setMake(String make) {
        this.make = make;
    }

    public String getAgency() {
        return agency;
    }

    public void setAgency(String agency) {
        this.agency = agency;
    }
}
