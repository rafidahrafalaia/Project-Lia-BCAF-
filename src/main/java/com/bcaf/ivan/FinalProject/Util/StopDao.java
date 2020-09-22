package com.bcaf.ivan.FinalProject.Util;


import com.bcaf.ivan.FinalProject.Entity.Agency;
import com.bcaf.ivan.FinalProject.Entity.Stop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StopDao extends JpaRepository<Stop, String> {
    @Query(nativeQuery = true, value = "SELECT ta.* FROM stop ta WHERE ta.agency_id =:id ")
    List<Stop> findStopAllByAgencyId(@Param("id") String id);
    @Query(nativeQuery = true, value = "SELECT ta.* FROM stop ta WHERE ta.user_id =:id ")
    Stop findStopByUserId(@Param("id") String id);
    @Query(nativeQuery = true,value="SELECT ta.* FROM agency ta WHERE ta.id =:id")
    Stop findStopwithID(@Param("id") String id);

}