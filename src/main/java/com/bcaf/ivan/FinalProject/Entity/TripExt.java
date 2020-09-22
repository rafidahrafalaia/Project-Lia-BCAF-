package com.bcaf.ivan.FinalProject.Entity;

import com.bcaf.ivan.FinalProject.Util.BusDao;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class TripExt extends Trip {


    private Bus bus;
    private Stop stop;
    private Stop stop2;

    public Bus getBus() {
        return bus;
    }

    public void setBus(Bus bus) {
        this.bus = bus;
    }

    public Stop getStop() {
        return stop;
    }

    public void setStop(Stop stop) {
        this.stop = stop;
    }

    public Stop getStop2() {
        return stop2;
    }

    public void setStop2(Stop stop) {
        this.stop2 = stop;
    }

    public TripExt() {
    }

    public TripExt(Trip t) {
        this.setId(t.getId());
        this.setAgencyId(t.getAgencyId());
        this.setBusId(t.getBusId());
        this.setFare(t.getFare());
        this.setSourceStopId(t.getSourceStopId());
        this.setDestStopId(t.getDestStopId());
        this.setJourneyTime(t.getJourneyTime());
        this.setCreatedDate(t.getCreatedDate());
        this.setUpdatedDate(t.getUpdatedDate());
    }
}
