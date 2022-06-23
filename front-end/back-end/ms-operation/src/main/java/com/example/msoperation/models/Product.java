package com.example.msoperation.models;

import lombok.Data;

import java.util.Date;
@Data
public class Product {

    private Long productId;
    private String nomP;
    private int qntP; //Product Quantity
    private String typeP;
    private Categorie categorie;
    private double prixP;
    private Date DatePeremption;
    private int Delai; //termes de jours
    private String nLot;
}
