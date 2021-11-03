package com.bcafinance.rafidahlia.testing.Security.Service;

import com.bcafinance.rafidahlia.testing.DAO.userDAO;
import com.bcafinance.rafidahlia.testing.Entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class UserServiceImpl implements UserDetailsService {
    @Autowired
    private userDAO user_DAO;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user=user_DAO.getUserByEmail(email);
        return new MyUserDetails(user);
    }
}
