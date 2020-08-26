package com.bcafinance.rafidahlia.testing.DAO;

import com.bcafinance.rafidahlia.testing.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface userDAO extends JpaRepository<User,String> {

}
