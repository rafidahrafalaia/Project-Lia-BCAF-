package com.bcaf.ivan.FinalProject.Controller;

import com.bcaf.ivan.FinalProject.Entity.Agency;
import com.bcaf.ivan.FinalProject.Entity.User;
import com.bcaf.ivan.FinalProject.Util.AgencyDao;
import com.bcaf.ivan.FinalProject.Util.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Optional;

@Controller
public class ProfileController {

    @Autowired
    private UserDao userDao;
    @Autowired
    private AgencyDao agencyDao;

    @GetMapping
    @RequestMapping({"/profile"})
    public String viewProfile(HttpServletRequest request, Model model,
        HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {
        response.setStatus(HttpServletResponse.SC_OK);
        HttpSession session = request.getSession(true);
        for (GrantedAuthority auth : authentication.getAuthorities()) {
            if ("owner".equals(auth.getAuthority())) {
//        HttpSession session = request.getSession(true);
                String userId=((User)authentication.getPrincipal()).getId();
                Agency agency = agencyDao.findAgencyByUserId(userId);
                session.setAttribute( "connectedUser" , userId);
                session.setAttribute( "agencyId" , agency.getId());
                User user = userDao.findById(userId).get();
                model.addAttribute("firstName", user.getFirstName());
                model.addAttribute("lastName", user.getLastName());
                model.addAttribute("contactNumber", user.getMobileNumber());
                model.addAttribute("email", user.getEmail());
                model.addAttribute("user", user);
//                model.addAttribute("id", user.getId());

            }
        }
        return "profile";
    }
//
//    @Bean
//    public BCryptPasswordEncoder pass() {
//        return new BCryptPasswordEncoder();
//    }

    public BCryptPasswordEncoder pass() {
        return new BCryptPasswordEncoder();
    }
    @PostMapping("updateProfile/{id}")
    public String updateStudent(@PathVariable("id") String id, @Validated User userUpdate, BindingResult result,
                                Model model) {
        if (result.hasErrors()) {

            System.out.println(result);
        }
        User user = userDao.findUserbyID(id);
        user.setFirstName(userUpdate.getFirstName());
        user.setLastName(userUpdate.getLastName());
        user.setEmail(userUpdate.getEmail());
        user.setPassword(pass().encode(userUpdate.getPassword()));
        user.setMobileNumber(userUpdate.getMobileNumber());
        userDao.save(user);
//        model.addAttribute("page", user.());
        return "redirect:/profile";
    }
}
