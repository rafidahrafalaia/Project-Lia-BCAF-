//package com.bcafinance.rafidahlia.testing.Controller;
//
//import com.bcafinance.rafidahlia.testing.Entity.Mahasiswa;
//import com.bcafinance.rafidahlia.testing.Repository.MahasiswaRepository;
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//public class NControllerMahasiswa {
//    @Autowired
//    private MahasiswaRepository mahasiswa;
//
//    @PostMapping
//    @RequestMapping("getMahasiswa")
//    public String getMahasiswa(String id, Model model) throws JsonProcessingException {
//        Mahasiswa iu=mahasiswa.findById(id).get();
//        ObjectMapper Obj = new ObjectMapper();
//        String rs=Obj.writeValueAsString(iu);
//        return rs;
//    }
//
//}
