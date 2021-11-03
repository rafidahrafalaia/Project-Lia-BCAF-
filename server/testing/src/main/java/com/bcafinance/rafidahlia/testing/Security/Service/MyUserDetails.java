package com.bcafinance.rafidahlia.testing.Security.Service;

import com.bcafinance.rafidahlia.testing.Entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Arrays;
import java.util.Collection;

public class MyUserDetails implements UserDetails {

    User user;
    public MyUserDetails(User user) {
        this.user = user;
    }
//    private Map<String, User> roles = new HashMap<>();
//    @PostConstruct
//    public void init() {
//        roles.put("admin2", new User("admin", "{noop}admin1", user.getRoles());
//        roles.put("user2", new User("user", "{noop}user1", getAuthority("ROLE_USER")));
//    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority authority = new SimpleGrantedAuthority(user.getRoles());
        return Arrays.asList(authority);
    }
    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return false;
    }
}