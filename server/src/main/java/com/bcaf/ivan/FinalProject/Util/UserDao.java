package com.bcaf.ivan.FinalProject.Util;


import com.bcaf.ivan.FinalProject.Entity.Role;
import com.bcaf.ivan.FinalProject.Entity.User;
import com.bcaf.ivan.FinalProject.Entity.UserExt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends JpaRepository<User,String> {

    @Query(nativeQuery = true,value="SELECT u.* FROM user u WHERE u.email =:email ")
    User findEmailValidation(@Param("email") String email);
    @Query(nativeQuery = true,value="SELECT ta.* FROM user ta WHERE ta.id =:id")
    User findUserbyID(@Param("id") String id);
}