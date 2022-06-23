package com.example.msoperation.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Produit_Utilise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    private String nomP;
    private int qntP;

    @JsonIgnore
    @ManyToMany(mappedBy = "ProduitsCh",fetch = FetchType.LAZY)
    private List<Details> details;

    @JsonIgnore
    @ManyToMany(mappedBy = "ProduitsAn",fetch = FetchType.LAZY)
    private List<Details> detail;
}
