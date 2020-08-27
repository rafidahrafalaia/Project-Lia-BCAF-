package com.bcafinance.rafidahlia.testing.DAO;

import com.bcafinance.rafidahlia.testing.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface userDAO extends JpaRepository<User,String> {

//    private final String SQL_SELECT = "SELECT * FROM items where item_name=?";
//    public User getUser
    @Query("SELECT u FROM User u WHERE u.email=:email")
    public User getUserByEmail(@Param("email") String email);
}
