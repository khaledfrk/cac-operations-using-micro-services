package com.example.msoperation.models;

import com.example.msoperation.Entities.Details;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class produit {

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idDetails")
    private Details details;
}
