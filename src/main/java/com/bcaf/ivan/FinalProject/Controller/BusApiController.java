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
public class BusApiController {

    @Autowired
    private BusDao busDao;

    @Autowired
    private AgencyDao agencyDao;

    @Autowired
    private TripDao tripDao;

//    @PostMapping("/getAllTrips")
//    public String getAllTrips(HttpServletRequest request) throws JsonProcessingException {
//        HttpSession session = request.getSession(true);
//        String agencyId = (String) session.getAttribute("agencyId");
//        List<Trip> listTrip = tripDao.findAll();
//        System.out.println(agencyId);
//        System.out.println(listTrip);
//        List<TripExt> listTripExts = new LinkedList<>();
//
//        for (Trip t : listTrip) {
//            TripExt tripExt = new TripExt(t);
//            tripExt.setBus(busDao.findById(t.getBusId()).get());
//            listTripExts.add(tripExt);
//        }
//
//        ObjectMapper Obj = new ObjectMapper();
//        String rs = Obj.writeValueAsString(listTrip);
//        return rs;
//    }


    @PostMapping("/getAllBus")
    public String getAllBus(HttpServletRequest request) throws JsonProcessingException {
        HttpSession session = request.getSession(true);
        String agencyId = (String) session.getAttribute("agencyId");
        List<Bus> listBus = busDao.findBusbyAgencyId(agencyId);
        if (listBus == null)
            listBus = new LinkedList<>();
        ObjectMapper Obj = new ObjectMapper();
        String rs = Obj.writeValueAsString(listBus);
        return rs;
    }

    @GetMapping("/getAllBus-angular")
    public String getAllBus(@RequestParam(name="id") String agencyId) throws JsonProcessingException {
        List<Bus> listBus = busDao.findAll();
        if (listBus == null)
            listBus = new LinkedList<>();
        ObjectMapper Obj = new ObjectMapper();
        String rs = Obj.writeValueAsString(listBus);
        return rs;
    }
    @PostMapping("/updateBus-angular")
    public String updateBusAngular(@RequestBody Bus Bus) throws JsonProcessingException {

        new Bus().setUpdatedDate(new Timestamp(System.currentTimeMillis()));
        busDao.save(Bus);

        ObjectMapper Obj = new ObjectMapper();
        String rs = Obj.writeValueAsString(busDao.findAll());
        return rs;
    }

    @PostMapping("/updateBus")
    public String updateBus(@RequestBody List<Bus> listBus) throws JsonProcessingException {
        for (Bus b : listBus) {
            b.setUpdatedDate(new Timestamp(System.currentTimeMillis()));
            busDao.save(b);
        }
        ObjectMapper Obj = new ObjectMapper();
        String rs = Obj.writeValueAsString(listBus);
        return rs;
    }

    @PostMapping("/addBus")
    public String addBus(@RequestBody List<Bus> listBus,HttpServletRequest request) throws JsonProcessingException {
        HttpSession session = request.getSession(true);
        String agencyId = (String) session.getAttribute("agencyId");
        for (Bus b : listBus) {
            b.setAgencyId(agencyId);
            b.setCreatedDate(new Timestamp(System.currentTimeMillis()));
            busDao.save(b);
        }
        ObjectMapper Obj = new ObjectMapper();
        String rs = Obj.writeValueAsString(listBus);
        return rs;
    }
    @PostMapping("/addBusAngular")
    public String addBusAngular(@RequestBody Bus Bus) throws JsonProcessingException {
        Bus newBus = new Bus();
        newBus.setAgencyId(Bus.getAgencyId());
        System.out.println(Bus.getCapacity());
        newBus.setCapacity(Bus.getCapacity());
////        System.out.println(bus.getCapacity());
        newBus.setCode(Bus.getCode());
        newBus.setMake(Bus.getMake());
        newBus.setCreatedDate(new Timestamp(System.currentTimeMillis()));
        busDao.save(newBus);

        ObjectMapper Obj = new ObjectMapper();
        String rs = Obj.writeValueAsString(busDao.findAll());
        return rs;
    }
    @PostMapping("/deleteBus")
    public String deleteBus(@RequestBody List<Bus> listBus) throws JsonProcessingException {
        for (Bus b : listBus) {
            busDao.delete(b);
        }
        ObjectMapper Obj = new ObjectMapper();
        String rs = Obj.writeValueAsString(listBus);
        return rs;
    }
}
