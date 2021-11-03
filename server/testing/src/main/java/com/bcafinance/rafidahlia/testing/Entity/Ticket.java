package com.bcafinance.rafidahlia.testing.Entity;

import com.sun.istack.NotNull;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
//import javax.validation.constraints.NotBlank;


@Entity
public class Ticket {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name ="uuid2", strategy = "uuid2")
    private String id;

    private int seatNumber;
    private boolean cancellable;
//    @NotBlank
    private String journeyDate;
    private long passenger;
    @NotNull
    private String tripSchedule;


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(int seatNumber) {
        this.seatNumber = seatNumber;
    }

    public boolean isCancellable() {
        return cancellable;
    }

    public void setCancellable(boolean cancellable) {
        this.cancellable = cancellable;
    }

    public String getJourneyDate() {
        return journeyDate;
    }

    public void setJourneyDate(String journeyDate) {
        this.journeyDate = journeyDate;
    }

    public long getPassenger() {
        return passenger;
    }

    public void setPassenger(long passenger) {
        this.passenger = passenger;
    }

    public String getTripSchedule() {
        return tripSchedule;
    }

    public void setTripSchedule(String tripSchedule) {
        this.tripSchedule = tripSchedule;
    }
}
