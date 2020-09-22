package com.bcaf.ivan.FinalProject.Controller;

import com.bcaf.ivan.FinalProject.Entity.Agency;
import com.bcaf.ivan.FinalProject.Entity.User;
import com.bcaf.ivan.FinalProject.Util.AgencyDao;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
public class AgencyController {
    @Autowired
    AgencyDao agencyDao;

    @GetMapping
    @RequestMapping({"/agency"})
    public String viewAgency(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession(true);
        String agencyId = (String) session.getAttribute("agencyId");
        Agency agency = agencyDao.findById(agencyId).get();
        model.addAttribute("agency",agency);
        return "agency";
    }

    @PostMapping("updateAgency/{id}")
    public String updateStudent(@PathVariable("id") String id, @Validated Agency agencyUpdate, BindingResult result,
                                Model model) {
        if (result.hasErrors()) {

            System.out.println(result);
        }
        Agency agency = agencyDao.findAgencywithID(id);
        agency.setName(agencyUpdate.getName());
        agency.setDetails(agencyUpdate.getDetails());
        agency.setCode(agency.getCode());
        agency.setUserId(agency.getUserId());
        agencyDao.save(agency);
//        model.addAttribute("page", user.());
        return "redirect:/agency";
    }


}
