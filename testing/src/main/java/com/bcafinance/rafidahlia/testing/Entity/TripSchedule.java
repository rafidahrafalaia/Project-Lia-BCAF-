package com.bcafinance.rafidahlia.testing.Entity;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;
//import javax.validation.constraints.NotBlank;


@Entity
public class TripSchedule {

    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name ="uuid2", strategy = "uuid2")
    private String id;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date tripDate;
//    @NotBlank
    private int availableSeats;
    private String tripDetail;
//    @NotNull
    @ElementCollection
    private Set<Integer> ticketsSold;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getTripDate() {
        return tripDate;
    }

    public void setTripDate(Date tripDate) {
        this.tripDate = tripDate;
    }

    public int getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(int availableSeats) {
        this.availableSeats = availableSeats;
    }

    public String getTripDetail() {
        return tripDetail;
    }

    public void setTripDetail(String tripDetail) {
        this.tripDetail = tripDetail;
    }

    public Set<Integer> getTicketsSold() {
        return ticketsSold;
    }

    public void setTicketsSold(Set<Integer> ticketsSold) {
        this.ticketsSold = ticketsSold;
    }
}
