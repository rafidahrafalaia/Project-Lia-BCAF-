package com.bcaf.ivan.FinalProject.Util;


import com.bcaf.ivan.FinalProject.Entity.Agency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AgencyDao extends JpaRepository<Agency, String> {
    @Query(nativeQuery = true, value = "SELECT ta.* FROM agency ta WHERE ta.user_id =:id ")
    Agency findAgencyByUserId(@Param("id") String id);
    @Query(nativeQuery = true,value="SELECT ta.* FROM agency ta WHERE ta.id =:id")
    Agency findAgencywithID(@Param("id") String id);

}