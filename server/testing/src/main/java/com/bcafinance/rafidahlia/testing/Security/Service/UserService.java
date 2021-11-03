package com.bcafinance.rafidahlia.testing.Security.Service;

import com.bcafinance.rafidahlia.testing.Entity.User;

public interface UserService {
    User loadUserByUserEmail(String email);
}
