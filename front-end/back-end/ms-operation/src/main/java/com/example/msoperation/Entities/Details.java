package com.example.msoperation.Entities;

import com.example.msoperation.models.produit;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Details {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDetails;

    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
    private LocalDateTime dateDebutBloc;

    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
    private LocalDateTime dateFinBloc;

    private String duree;
    //Table manipulation qui contient des listes
    @Embedded
    private ProtocoleOperatoire protocoleOperatoire;
    @Embedded
    @Column(nullable = true)
    private ProtocoleAnesthesie protocoleAnesthesie;

    @Embedded
    @Column(nullable = true)
    private Reveil reveil;
    private String accidents;
    private String incidents;
    @OneToOne
    @JsonIgnore
    private Operation operation;

    @ManyToMany
    @JoinTable(name="JoinChirurgien",
            inverseJoinColumns=@JoinColumn(name="productId"),
            joinColumns=@JoinColumn(name="idDetails"))
    private List<Produit_Utilise> ProduitsCh;

    @ManyToMany
    @JoinTable(name="JoinAnesthesie",
            inverseJoinColumns=@JoinColumn(name="productId"),
            joinColumns=@JoinColumn(name="idDetails"))
    private List<Produit_Utilise> ProduitsAn;

   // @OneToMany
    //private List<Produit> productsAn;

    @OneToMany(mappedBy = "details", fetch = FetchType.EAGER)
    private List<produit> products;


}
