package com.bcaf.ivan.FinalProject.Controller;


import com.bcaf.ivan.FinalProject.Entity.Bus;
import com.bcaf.ivan.FinalProject.Entity.Stop;
import com.bcaf.ivan.FinalProject.Util.AgencyDao;
import com.bcaf.ivan.FinalProject.Util.BusDao;
import com.bcaf.ivan.FinalProject.Util.StopDao;
import com.bcaf.ivan.FinalProject.Util.TripDao;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class StopApiController {

    @Autowired
    private StopDao stopDao;

    @PostMapping("/getAllStop")
    public String getAllBus() throws JsonProcessingException {
        List<Stop> listStop = stopDao.findAll();
        System.out.println(listStop);
        if (listStop == null)
            listStop = new LinkedList<>();
        ObjectMapper Obj = new ObjectMapper();
        String rs = Obj.writeValueAsString(listStop);
        return rs;
    }

    @GetMapping("/getAllStopAngular")
    public String getAllStopAngular(@RequestParam(name="id") String agencyId) throws JsonProcessingException {

        List<Stop> listStop = stopDao.findAll();
        if (listStop == null)
            listStop = new LinkedList<>();
        ObjectMapper Obj = new ObjectMapper();
        String rs = Obj.writeValueAsString(listStop);
        return rs;
    }
}
