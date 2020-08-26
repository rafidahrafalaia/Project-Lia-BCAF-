package com.bcafinance.rafidahlia.testing.Util;

import java.sql.Connection;
import java.sql.DriverManager;

public class AdapterJDBC {

    private static final String url = "jdbc:mysql://127.0.0.1:3306/bcafinance";
    private static final String user="root";
    private static final String password="Rahasia2";

    public static Connection getConnection(){
        Connection conn=null;
        try{
//            Class.forName("com.mysql.cj.jdbc.Driver");
            conn= DriverManager.getConnection(url,user,password);
            System.out.println("connected to the MYSQL server successfully");
        }catch (Exception e){
            System.out.println("Connection to the MYSQL error");
            System.out.println(e.getMessage());
        }
        return conn;
    }

}
