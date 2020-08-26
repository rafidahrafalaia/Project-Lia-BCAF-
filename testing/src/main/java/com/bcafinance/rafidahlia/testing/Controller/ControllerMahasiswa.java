//package com.bcafinance.rafidahlia.testing.Controller;
//
//import com.bcafinance.rafidahlia.testing.Entity.Mahasiswa;
//import com.bcafinance.rafidahlia.testing.Repository.MahasiswaRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.web.PageableDefault;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.validation.BindingResult;
//import org.springframework.validation.annotation.Validated;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//
//@Controller
//public class ControllerMahasiswa {
//    @Autowired
//    private MahasiswaRepository mahasiswaRepository;
//
//    @GetMapping("/")
//    public String index(@PageableDefault(size = 3) Pageable pageable, Model model){
//        Page<Mahasiswa> page= mahasiswaRepository.findAll(pageable);
//        List<Mahasiswa> mh = mahasiswaRepository.findAll();
//        model.addAttribute("page",page);
//        model.addAttribute("totalMahasiswa",mh.size());
//        return "index";
//    }
//
//    @PostMapping(path="/save-student") //Map ONLY POST Request
//    public @ResponseBody
//    String addNewMahasiswa(@RequestParam String jurusan, @RequestParam String nim, @RequestParam String name, @RequestParam float ipk){
//        Mahasiswa m=new Mahasiswa();
//        m.setIpk(ipk);
//        m.setJurusan(jurusan);
//        m.setName(name);
//        m.setNim(nim);
//        mahasiswaRepository.save(m);
//        return "Saved";
//    }
//    @GetMapping("/delete/{id}")
//    public String deleteEmployee(@PathVariable (value = "id") String id) {
//
//        // call delete employee method
//        mahasiswaRepository.deleteById(id);
//        return "redirect:/";
//    }
//    @GetMapping("signup")
//    public String showSignUpForm(Mahasiswa student, Model model) {
//        model.addAttribute("mhs",student);
//        return "add-mahasiswa";
//    }
//    @PostMapping("add")
//    public String addMahasiswa(@Validated Mahasiswa mahasiswa, BindingResult result, Model model) {
//        if (result.hasErrors()) {
//            return "add-mahasiswa";
//        }
//
//        mahasiswaRepository.save(mahasiswa);
//        return "redirect:/";
//    }
//    @GetMapping("edit/{id}")
//    public String showUpdateForm(@PathVariable("id") String id, Model model) {
//        Mahasiswa page = mahasiswaRepository.findById(id)
//                .orElseThrow(() -> new IllegalArgumentException("Invalid student Id:" + id));
//        model.addAttribute("page", page);
//        return "update-mahasiswa";
//    }
//
//    @PostMapping("update/{id}")
//    public String updateStudent(@PathVariable("id") String id, @Validated Mahasiswa mahasiswa, BindingResult result,
//                                Model model) {
//            if (result.hasErrors()) {
//                mahasiswa.setId(id);
//                return "update-student";
//            }
//
//            mahasiswaRepository.save(mahasiswa);
//            model.addAttribute("page", mahasiswaRepository.findAll());
//            return "redirect:/";
//    }
//
//    @GetMapping(path = "/all-student")
//    public @ResponseBody Iterable<Mahasiswa> getAllStudents(){
//        //this returns a JSON or XML with the users
//        return mahasiswaRepository.findAll();
//    }
//}
