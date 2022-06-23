package com.example.msstock.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProductEntree {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;
    private String nomP;
    private int qntP; //Product Quantity
    private String typeP;
    private Categorie categorie;
    private double prixP;
    private Date datePeremption;
    private int delai; //termes de jours
    private String nlot;
}
