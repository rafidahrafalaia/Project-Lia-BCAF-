package com.bcaf.ivan.FinalProject.Controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LoginController {



    @GetMapping
    @RequestMapping("/login")
    public String login(String email,String password) throws JsonProcessingException {
        return "login";
    }

}
