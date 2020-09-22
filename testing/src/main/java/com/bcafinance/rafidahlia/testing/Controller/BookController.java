//package com.bcafinance.rafidahlia.testing.Controller;
//
//import com.bcafinance.rafidahlia.testing.Entity.Book;
//import com.bcafinance.rafidahlia.testing.Repository.BookRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import javax.validation.Valid;
//import java.util.List;
//
//@RestController
//@RequestMapping("/api")
//public class BookController {
//
//        @Autowired
//        BookRepository bookRepository;
//
//        @GetMapping("/books")
//        public List<Book> getAll() {
//            return bookRepository.findAll();
//        }
//
//        @PostMapping("/book")
//        public void saveBook(@Valid @RequestBody Book book) {
//            bookRepository.save(book);
//        }
//
//        @DeleteMapping("/book/{id}")
//        public String deleteBook(@PathVariable (value = "id") long id) {
//                Book book = bookRepository.findById(id)
//                        .orElseThrow(() -> new IllegalArgumentException("Invalid Id:" + id));
//        // call delete employee method
//        bookRepository.deleteById(id);
//        return "redirect:/";
//        }
//
//        @PutMapping(path="/book/{id}")
//        public ResponseEntity<Book> updateBook(@PathVariable(value = "id") Long id, @Valid @RequestBody Book book){
//                Book listBook=bookRepository.findById(id).get();
//                listBook.setNamaBelakangPengarang(book.getNamaBelakangPengarang());
//                listBook.setNamaDepanPengarang(book.getNamaDepanPengarang());
//                listBook.setNamaPeminjam(book.getNamaPeminjam());
//                listBook.setTitle(book.getTitle());
//                listBook.setStatusPinjam(book.getStatusPinjam());
//                Book updatedBook = bookRepository.save(listBook);
//                return ResponseEntity.ok(updatedBook);
//        }
//}
//
