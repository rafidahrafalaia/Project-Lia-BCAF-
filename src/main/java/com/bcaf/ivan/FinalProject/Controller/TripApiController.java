package com.bcaf.ivan.FinalProject.Controller;


import com.bcaf.ivan.FinalProject.Entity.*;
import com.bcaf.ivan.FinalProject.Request.RegisterRequest;
import com.bcaf.ivan.FinalProject.Util.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TripApiController {

    @Autowired
    private TripDao tripDao;
    @Autowired
    private BusDao busDao;
    @Autowired
    private AgencyDao agencyDao;
    @Autowired
    private StopDao stopDao;
//
//
    @PostMapping("/getAllTrips")
    public String getAllTrips(HttpServletRequest request) throws JsonProcessingException {
        HttpSession session = request.getSession(true);
        String agencyId = (String) session.getAttribute("agencyId");
        System.out.println(agencyId);
        List<Trip> listTrip = tripDao.findTripbyAgencyId(agencyId);
        List<TripExt> listTripExts = new LinkedList<>();
        System.out.println(agencyId);
        for (Trip t : listTrip) {
            TripExt tripExt = new TripExt(t);
            tripExt.setBus(busDao.findById(t.getBusId()).get());
            tripExt.setStop(stopDao.findById(t.getSourceStopId()).get());
            tripExt.setStop2(stopDao.findById(t.getDestStopId()).get());
            listTripExts.add(tripExt);
        }
        System.out.println(listTripExts);
        ObjectMapper Obj = new ObjectMapper();
        String rs = Obj.writeValueAsString(listTripExts);
        return rs;
    }

    @PostMapping("/addTrip")
    public String addTrip(@RequestBody List<TripExt> listTrip, HttpServletRequest request) throws JsonProcessingException {
        HttpSession session = request.getSession(true);
        String agencyId = (String) session.getAttribute("agencyId");
        for (TripExt t : listTrip) {
            Trip newTrip=new Trip();
            newTrip.setAgencyId(agencyId);
            newTrip.setBusId(t.getBus().getId());
            newTrip.setCreatedDate(new Timestamp(System.currentTimeMillis()));
            newTrip.setDestStopId(t.getStop().getId());
            newTrip.setSourceStopId(t.getStop2().getId());
            newTrip.setFare(t.getFare());
            newTrip.setJourneyTime(t.getJourneyTime());
            tripDao.save(newTrip);
        }
        ObjectMapper Obj = new ObjectMapper();
        String rs = Obj.writeValueAsString(listTrip);
        return rs;
    }

    @PostMapping("/updateTrip")
    public String updateTrip(@RequestBody List<TripExt> listTrip, HttpServletRequest request) throws JsonProcessingException {
        HttpSession session = request.getSession(true);
        String agencyId = (String) session.getAttribute("agencyId");
        for (TripExt t : listTrip) {
            Trip newT=tripDao.findById(t.getId()).get();
            newT.setFare(t.getFare());
            newT.setJourneyTime(t.getJourneyTime());
            newT.setBusId(t.getBus().getId());
            newT.setSourceStopId(t.getStop().getId());
            newT.setDestStopId(t.getStop2().getId());
            newT.setUpdatedDate(new Timestamp(System.currentTimeMillis()));
            tripDao.save(newT);
        }
        ObjectMapper Obj = new ObjectMapper();
        String rs = Obj.writeValueAsString(listTrip);
        return rs;
    }


    @PostMapping("/deleteTrip")
    public String deleteTrip(@RequestBody List<TripExt> listTrip) throws JsonProcessingException {

        for (TripExt t : listTrip) {
            System.out.println("lol     "+t.getId());
            tripDao.deleteById(t.getId());
        }
        ObjectMapper Obj = new ObjectMapper();
        String rs = Obj.writeValueAsString(listTrip);
        return rs;
    }

    @PostMapping("/deleteTrips-angular")
    public String deleteTrips(@RequestBody String tripId) throws JsonProcessingException {
        tripDao.deleteById(tripId);
        ObjectMapper Obj = new ObjectMapper();
        String rs = Obj.writeValueAsString(tripDao.findAll());
        return rs;
    }

    @GetMapping("/getAllTrips-angular")
    public String getAllTrips(@RequestParam(name="id") String agencyId) throws JsonProcessingException {

        List<Trip> listTrip = tripDao.findTripbyAgencyId(agencyId);
        List<TripExt> listTripExts = new LinkedList<>();

        for (Trip t : listTrip) {
            TripExt tripExt = new TripExt(t);
            tripExt.setBus(busDao.findById(t.getBusId()).get());
            tripExt.setStop(stopDao.findById(t.getSourceStopId()).get());
            tripExt.setStop2(stopDao.findById(t.getDestStopId()).get());
            listTripExts.add(tripExt);
        }

        ObjectMapper Obj = new ObjectMapper();
        String rs = Obj.writeValueAsString(listTripExts);
        return rs;
    }


    @PostMapping("/updateTripsAngular")
    public String updateTripsAngular(@RequestBody TripExt addTrip) throws JsonProcessingException {
        Trip newTrip= tripDao.findById(addTrip.getId()).get();
        newTrip.setBusId(addTrip.getBus().getId());
        newTrip.setUpdatedDate(new Timestamp(System.currentTimeMillis()));
        newTrip.setDestStopId(addTrip.getStop().getId());
        newTrip.setSourceStopId(addTrip.getStop().getId());
        newTrip.setFare(addTrip.getFare());
        newTrip.setJourneyTime(addTrip.getJourneyTime());

        tripDao.save(newTrip);

        ObjectMapper Obj = new ObjectMapper();
        String rs = Obj.writeValueAsString(tripDao.findAll());
        return rs;
    }


    @PostMapping("/addTripAngular")
    public String addTripAng(@RequestBody Trip trip) throws JsonProcessingException {

            Trip newTrip=new Trip();
            newTrip.setAgencyId(trip.getAgencyId());
            newTrip.setBusId(trip.getBusId());
            newTrip.setCreatedDate(new Timestamp(System.currentTimeMillis()));
            newTrip.setDestStopId(trip.getDestStopId());
            newTrip.setSourceStopId(trip.getSourceStopId());
            newTrip.setFare(trip.getFare());
            newTrip.setJourneyTime(trip.getJourneyTime());
            tripDao.save(newTrip);

        ObjectMapper Obj = new ObjectMapper();
        String rs = Obj.writeValueAsString(newTrip);
        return rs;
    }

}