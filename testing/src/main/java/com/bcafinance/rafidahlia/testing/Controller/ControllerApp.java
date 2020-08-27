package com.bcafinance.rafidahlia.testing.Controller;

import com.bcafinance.rafidahlia.testing.DAO.agencyDAO;
import com.bcafinance.rafidahlia.testing.DAO.userDAO;
import com.bcafinance.rafidahlia.testing.Entity.Agency;
import com.bcafinance.rafidahlia.testing.Entity.User;
import com.bcafinance.rafidahlia.testing.Request.UserAgencyReq;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class ControllerApp {
    private UserAgencyReq userAgencyReq;

    @Autowired
    userDAO user_DAO;
    @Autowired
    agencyDAO agency_DAO;

    private User user;
    private Agency agency;

    public ControllerApp(){
        this.userAgencyReq = new UserAgencyReq();
    }

    @GetMapping("/")
    public String register(UserAgencyReq userAgencyReq, Model model) {
        model.addAttribute("userAgency",userAgencyReq);
        return "register";
    }

    @GetMapping
    @RequestMapping("login")
    public String login(UserAgencyReq userAgencyReq, Model model) {
        model.addAttribute("userAgency",userAgencyReq);
        return "login";
    }

    @PostMapping("login")
    public String home(User userAgencyReq) {
//        model.addAttribute("userAgencyReq",userAgencyReq);
        return "index";
    }

    @PostMapping("register")
    public String saveBook(UserAgencyReq UserAgency) {
        user = new User();
        agency = new Agency();
        user.setFirstname(UserAgency.getFirstname());
        user.setLastname(UserAgency.getLastname());
        user.setEmail(UserAgency.getEmail());
        user.setPassword(user.setHashPassword(UserAgency.getPassword()));
        user.setMobileNumber(UserAgency.getContactNumb());
        user.setRoles("Admin");
        user_DAO.save(user);
        agency.setName(UserAgency.getAgencyName());
        agency.setDetails(UserAgency.getAgencyDetails());
        agency.setOwner(user.getId());
        agency_DAO.save(agency);
        return "index";
    }

}
