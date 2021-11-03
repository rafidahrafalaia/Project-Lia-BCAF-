package com.bcaf.ivan.FinalProject.Controller;

import com.bcaf.ivan.FinalProject.Entity.Agency;
import com.bcaf.ivan.FinalProject.Entity.User;
import com.bcaf.ivan.FinalProject.Request.RegisterRequest;
import com.bcaf.ivan.FinalProject.Util.AgencyDao;
import com.bcaf.ivan.FinalProject.Util.CreateJWT;
import com.bcaf.ivan.FinalProject.Util.RoleDao;
import com.bcaf.ivan.FinalProject.Util.UserDao;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.sql.Timestamp;

@RestController
@RequestMapping("/api")
public class UserApiController {

    @Autowired
    private UserDao userDao;
    @Autowired
    private RoleDao roleDao;
    @Autowired
    private AgencyDao agencyDao;

    @Bean
    public BCryptPasswordEncoder pass() {
        return new BCryptPasswordEncoder();
    }
    @PostMapping("/createNewAccount")
    public HttpStatus createNewAccount(@RequestBody RegisterRequest registerRequest) {
        User user = new User();
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setEmail(registerRequest.getEmail());
        user.setMobileNumber(registerRequest.getContactNumber());
        user.setRoleId(roleDao.findIdByRole("owner").getId());
        user.setCreatedDate(new Timestamp(System.currentTimeMillis()));
        user.setPassword(pass().encode(registerRequest.getPassword()));
        userDao.save(user);

        Agency agency = new Agency();
        agency.setName(registerRequest.getAgencyName());
        agency.setDetails(registerRequest.getAgencyDetail());
        agency.setUserId(user.getId());
        agency.setCreatedDate(new Timestamp(System.currentTimeMillis()));
        agencyDao.save(agency);
        return HttpStatus.OK;
    }

    @PostMapping("/checkEmailUser")
    public String checkEmailUser(@RequestBody RegisterRequest registerRequest) throws JsonProcessingException {
        User user = userDao.findEmailValidation(registerRequest.getEmail());
        if (user == null)
            user = new User();
        ObjectMapper Obj = new ObjectMapper();
        String rs = Obj.writeValueAsString(user);
        return rs;
    }

    @PostMapping("/performLogin")
    public String performLogin(@RequestBody User user) throws JsonProcessingException, InvalidKeySpecException, NoSuchAlgorithmException {
        User userDB = userDao.findEmailValidation(user.getEmail());
        if (user == null)
            user = new User();
        ObjectMapper Obj = new ObjectMapper();
        String rs = Obj.writeValueAsString(user);
        if (user.validatePassword(user.getPassword(), userDB.getPassword())) {
            rs = Obj.writeValueAsString(userDB);
        }
        return rs;
    }

    @PostMapping("/login")
    public String login(String email,String password) throws JsonProcessingException {
        User user = userDao.findEmailValidation(email);
        Agency agency=agencyDao.findAgencyByUserId(user.getId());

        String encoded= pass().encode(password);
        System.out.println(encoded);
        if (pass().matches(password, user.getPassword())) {
            String JWT = new CreateJWT()
                    .buildJWT(user, agency.getId());
            ObjectMapper mapper = new ObjectMapper();
            ObjectNode UserResponse = mapper.createObjectNode();
            UserResponse.put("data", JWT);
            String rs = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(UserResponse);
            return rs;
        } else {
            return "err";
        }
    }
}
