package com.bcaf.ivan.FinalProject.Controller;

import com.bcaf.ivan.FinalProject.Entity.Agency;
import com.bcaf.ivan.FinalProject.Entity.Bus;
import com.bcaf.ivan.FinalProject.Entity.Stop;
import com.bcaf.ivan.FinalProject.Entity.User;
import com.bcaf.ivan.FinalProject.Util.AgencyDao;
import com.bcaf.ivan.FinalProject.Util.BusDao;
import com.bcaf.ivan.FinalProject.Util.StopDao;
import com.bcaf.ivan.FinalProject.Util.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

import java.sql.*;
import java.util.List;

@Controller
public class IndexController {
    @Autowired
    UserDao userDao;
    @Autowired
    private AgencyDao agencyDao;
    @Autowired
    private BusDao busDao;
    @Autowired
    private StopDao stopDao;

    @GetMapping
    @RequestMapping({"/","/index","/dashboard"}) public String index(HttpServletRequest request, Model model,
                                                                     HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {
        response.setStatus(HttpServletResponse.SC_OK);
        HttpSession session = request.getSession(true);
        for (GrantedAuthority auth : authentication.getAuthorities()) {
            if ("owner".equals(auth.getAuthority())) {
//        HttpSession session = request.getSession(true);
                String id=((User)authentication.getPrincipal()).getId();
                Agency agency = agencyDao.findAgencyByUserId(id);
//                System.out.println(id);
                session.setAttribute( "connectedUser" , id);
                session.setAttribute( "agencyId" , agency.getId());
            }
        }
        return "index";
    }

    @GetMapping
    @RequestMapping({"/buses"})
    public String viewBus() {

        return "busView";
    }

    @GetMapping
    @RequestMapping({"/trips"})
    public String viewTrips() {
        List<Bus> listBus = busDao.findAll();
        List<Stop> listStop = stopDao.findAll();

        return "TripView";
    }

//
//    @GetMapping
//    @RequestMapping({"/agency"})
//    public String viewAgency(HttpServletRequest request, Model model) {
//        HttpSession session = request.getSession(true);
//        String agencyId = (String) session.getAttribute("agencyId");
//
//        Agency agency =  agencyDao.findById(agencyId).get();
//        model.addAttribute("agency", agency);
//        return "agency";
//    }

    //    @GetMapping
//    @RequestMapping({"/profile"})
//    public String viewProfile(HttpServletRequest request, Model model) {
//        HttpSession session = request.getSession(true);
//        String userId = (String) session.getAttribute("connectedUser");
//        User user = userDao.findById(userId).get();
//        model.addAttribute("firstName", user.getFirstName());
//        model.addAttribute("lastName", user.getLastName());
//        model.addAttribute("phoneNumber", user.getMobileNumber());
//        model.addAttribute("email", user.getEmail());
//        return "profile";
//    }
    @GetMapping
    @RequestMapping({"/session"})
    public String session(HttpServletRequest request,
                          HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {
        response.setStatus(HttpServletResponse.SC_OK);
        HttpSession session = request.getSession();
        String userId=((User)authentication.getPrincipal()).getId();
        Agency agency = agencyDao.findAgencyByUserId(userId);
        session.setAttribute( "connectedUser" , userId);
        session.setAttribute( "agencyId" , agency.getId());
        response.sendRedirect("/register");
        return "profile";
    }
}
