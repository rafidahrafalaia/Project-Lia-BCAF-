package com.bcaf.ivan.FinalProject.Controller;

import com.bcaf.ivan.FinalProject.Entity.Agency;
import com.bcaf.ivan.FinalProject.Util.AgencyDao;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.Timestamp;

@RestController
@RequestMapping("/api")
public class AgencyApiControlller {
    @Autowired
    AgencyDao agencyDao;

    @GetMapping("/getAgencyApi")
    public String getAgency(@RequestParam(name="id") String agencyId) throws JsonProcessingException {
        Agency agency = agencyDao.findAgencywithID(agencyId);
        ObjectMapper mapper = new ObjectMapper();
        String rs = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(agency);
        return rs;
    }
    @PostMapping("/updateAgency")
    public String updateAgency(@RequestBody Agency agency, HttpServletRequest request) throws JsonProcessingException {
        HttpSession session = request.getSession(true);
        String agencyId = (String) session.getAttribute("agencyId");
        Agency agencyDB = agencyDao.findById(agencyId).get();
        if(agency.getName()!=null && agency.getName()!="")
            agencyDB.setName(agency.getName());
        if(agency.getDetails()!=null && agency.getDetails()!="")
            agencyDB.setDetails(agency.getDetails());
        agencyDB.setUpdatedDate(new Timestamp(System.currentTimeMillis()));
        agencyDao.save(agencyDB);
        ObjectMapper Obj = new ObjectMapper();
        String rs = Obj.writeValueAsString(agency);
        return rs;
    }

    @PostMapping("/updateAgency-angular")
    public String updateAgency(@RequestBody Agency agency) throws JsonProcessingException {
        Agency agencyDB = agencyDao.findById(agency.getId()).get();
//        System.out.println(agency.getId());
        if(agency.getName()!=null && agency.getName()!="")
            agencyDB.setName(agency.getName());
        if(agency.getDetails()!=null && agency.getDetails()!="")
            agencyDB.setDetails(agency.getDetails());
        agencyDB.setUpdatedDate(new Timestamp(System.currentTimeMillis()));
        agencyDao.save(agencyDB);
        ObjectMapper Obj = new ObjectMapper();
        String rs = Obj.writeValueAsString(agency);
        return rs;
    }

}
