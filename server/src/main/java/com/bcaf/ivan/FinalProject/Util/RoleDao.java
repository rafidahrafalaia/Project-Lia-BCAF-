package com.bcaf.ivan.FinalProject.Util;

import com.bcaf.ivan.FinalProject.Entity.Role;
import com.bcaf.ivan.FinalProject.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoleDao extends JpaRepository<Role,String> {

    @Query(nativeQuery = true,value="SELECT r.* FROM role r WHERE r.role =:role  ")
    Role findIdByRole(@Param("role") String role);

    @Query(nativeQuery = true,value="SELECT r.* FROM role r WHERE r.id =:id")
    List<Role> findNameByRole(@Param("id") String id);
}