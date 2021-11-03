//package com.bcafinance.rafidahlia.testing.Controller;
//import com.bcafinance.rafidahlia.testing.Util.ServItems;
//import com.bcafinance.rafidahlia.testing.Entity.items;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.GetMapping;
//
//import java.util.List;
//
//@Controller
//public class ControllerItem {
//    private ServItems Item;
//
//    public ControllerItem(){
//        this.Item = new ServItems();
//    }
//    @GetMapping("/item")
//    String index(Model model){
//        List<items> listItem = Item.doSelect();
//        model.addAttribute("listItem",listItem);
//        return "index";
//    }
//
//}