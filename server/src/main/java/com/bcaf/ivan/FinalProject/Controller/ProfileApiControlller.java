package com.bcaf.ivan.FinalProject.Controller;

import com.bcaf.ivan.FinalProject.Entity.Agency;
import com.bcaf.ivan.FinalProject.Entity.User;
import com.bcaf.ivan.FinalProject.Util.AgencyDao;
import com.bcaf.ivan.FinalProject.Util.UserDao;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.Timestamp;

@RestController
@RequestMapping("/api")
public class ProfileApiControlller {
    public BCryptPasswordEncoder pass() {
        return new BCryptPasswordEncoder();
    }
    @Autowired
    UserDao userDao;

    @GetMapping("/getUserId")
    public String getUser(@RequestParam(name="id") String userId) throws JsonProcessingException {
//        System.out.println("agencyId" + userId);
        User user = userDao.findById(userId).get();
//        System.out.println( "agencyId" + user.getEmail());
        ObjectMapper mapper = new ObjectMapper();
        String rs = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(user);
        return rs;
    }

    @PostMapping("/updateProfile")
    public String updateStudent(@RequestBody User user) throws JsonProcessingException {
        User userDB = userDao.findById(user.getId()).get();
        System.out.println(user.getId());
        userDB.setFirstName(user.getFirstName());
        userDB.setLastName(user.getLastName());
        userDB.setEmail(user.getEmail());
        userDB.setPassword(user.getPassword());
        System.out.println(pass().encode(user.getPassword()));
        userDB.setMobileNumber(user.getMobileNumber());
        userDao.save(userDB);
        ObjectMapper Obj = new ObjectMapper();
        String rs = Obj.writeValueAsString(user);
        return rs;
    }
    @PostMapping("/updateProfilePass")
    public String updatePassword(@RequestBody User user) throws JsonProcessingException {
        User userDB = userDao.findById(user.getId()).get();
        System.out.println(user.getId());
        userDB.setFirstName(user.getFirstName());
        userDB.setLastName(user.getLastName());
        userDB.setEmail(user.getEmail());
        userDB.setPassword(pass().encode(user.getPassword()));
        System.out.println(pass().encode(user.getPassword()));
        userDB.setMobileNumber(user.getMobileNumber());
        userDao.save(userDB);
        ObjectMapper Obj = new ObjectMapper();
        String rs = Obj.writeValueAsString(user);
        return rs;
    }
}
