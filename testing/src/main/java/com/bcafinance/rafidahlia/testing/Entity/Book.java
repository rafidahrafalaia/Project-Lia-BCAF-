package com.bcafinance.rafidahlia.testing.Entity;


import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @NotBlank
    private String title;
    @NotBlank
    private String namaDepanPengarang;
    @NotBlank
    private String namaBelakangPengarang;
    @NotBlank
    private String statusPinjam;
    @NotBlank
    private String namaPeminjam;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Date updatedAt;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getNamaDepanPengarang() {
        return namaDepanPengarang;
    }

    public void setNamaDepanPengarang(String namaDepanPengarang) {
        this.namaDepanPengarang = namaDepanPengarang;
    }

    public String getNamaBelakangPengarang() {
        return namaBelakangPengarang;
    }

    public void setNamaBelakangPengarang(String namaBelakangPengarang) {
        this.namaBelakangPengarang = namaBelakangPengarang;
    }

    public String getStatusPinjam() {
        return statusPinjam;
    }

    public void setStatusPinjam(String statusPinjam) {
        this.statusPinjam = statusPinjam;
    }

    public String getNamaPeminjam() {
        return namaPeminjam;
    }

    public void setNamaPeminjam(String namaPeminjam) {
        this.namaPeminjam = namaPeminjam;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }
}