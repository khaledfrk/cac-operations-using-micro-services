package com.example.msstock.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProductSortie {
    @Id
    @Column(nullable = false)
    private Long productSId;
    @Column(nullable = false)
    private String nomP;
    private int qntP; //Product Quantity
    private String typeP;
    private Categorie categorie;
    private double prixP;
    private String nlot;
}