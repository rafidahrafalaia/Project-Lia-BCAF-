package com.bcafinance.rafidahlia.testing.Util;
import com.bcafinance.rafidahlia.testing.Entity.items;

import java.math.BigDecimal;
import java.sql.*;
import java.util.LinkedList;
import java.util.List;

public class ServItems {
    List<items> itemsList = new LinkedList<>();

    private Connection conn;
    final String INSERT_ITEMS = "insert into items(item_name, item_type, description, price, stock, created_date) values(?,?,?,?,?,?)";
    final String UpdateItems="UPDATE items SET price=? WHERE item_name=?";
    final String DeleteItems="DELETE FROM items WHERE item_name=?";
    private final String SQL_SELECT = "SELECT * FROM items where item_name=?";


    public ServItems(){
        conn= AdapterJDBC.getConnection();
    }
//
//    public static void main(String[] args){
//        ServItems si=new ServItems();
//        si.doSelect();
//    }

    public void doINSERT(){
        try {
            PreparedStatement preparedStatement1 = conn.prepareStatement(INSERT_ITEMS);
            preparedStatement1.setString(1,"zxz");
            preparedStatement1.setInt(2,7);
            preparedStatement1.setString(3,"zzzzzzzzzzzzzzzzz");
            preparedStatement1.setDouble(4,788.1221);
            preparedStatement1.setInt(5,2);
            preparedStatement1.setTimestamp(6,new Timestamp(System.currentTimeMillis()));
            int row=preparedStatement1.executeUpdate();
            System.out.println(row);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    public void doUpdate(){
        try {
            PreparedStatement preparedStatement2=conn.prepareStatement(UpdateItems);
            preparedStatement2.setDouble(1, 1000);
            preparedStatement2.setString(2, "zzz");
            int row2=preparedStatement2.executeUpdate();
            System.out.println(row2);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }

    public void doDelete(){
        try {
            PreparedStatement preparedStatement3 = conn.prepareStatement(DeleteItems);
            preparedStatement3.setString(1, "zzy");
            int row3 = preparedStatement3.executeUpdate();
            System.out.println(row3);
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
    }
//    public Page<items> findPaginated(Pageable pageable) {
//        int pageSize = pageable.getPageSize();
//        int currentPage = pageable.getPageNumber();
//        int startItem = currentPage * pageSize;
//        List<items> list;
//
//        if (itemsList.size() < startItem) {
//            list = Collections.emptyList();
//        } else {
//            int toIndex = Math.min(startItem + pageSize, itemsList.size());
//            list = itemsList.subList(startItem, toIndex);
//        }
//
//        Page<items> bookPage = new PageImpl<items>(list, PageRequest.of(currentPage, pageSize), itemsList.size());
//
//        return bookPage;
//    }
//    }

    public List<items> doSelect(){
        try{
            PreparedStatement preparedStatement4 = conn.prepareStatement(SQL_SELECT);
            preparedStatement4.setString(1, "zxz");
            {
                ResultSet resultSet = preparedStatement4.executeQuery();
                while (resultSet.next()) {

                    long id = resultSet.getLong("_id");
                    String name = resultSet.getString("item_name");
                    String type = resultSet.getString("item_type");
                    String desc = resultSet.getString("description");
                    BigDecimal price = resultSet.getBigDecimal("price");
                    Integer stock = resultSet.getInt("stock");
                    Timestamp createdDate = resultSet.getTimestamp("created_date");
                    Timestamp updatedDate = resultSet.getTimestamp("updated_date");

                    items obj = new items();
                    obj.set_id(id);
                    obj.setItem_name(name);
                    obj.setItem_type(type);
                    obj.setDescription(desc);
                    obj.setPrice(price);
                    obj.setStock(stock);
                    // Timestamp -> LocalDateTime
//                    obj.setCreatedDate();
                    System.out.println(obj.toString());
                    itemsList.add(obj);
                }
            }
        } catch(SQLException e){
            e.printStackTrace();
        }

        return itemsList;
    }
}
