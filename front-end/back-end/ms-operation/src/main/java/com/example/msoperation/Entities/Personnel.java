package com.example.msoperation.Entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


import javax.persistence.*;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Personnel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPersonnel;

    private String nom;
    private String prenom;
    private int numTel;

    @Embedded
    private Adresse adresse;

    @Column(unique = true)
    private String username;
    @Column
    private String password;
    @Column
    private String role;

    @Temporal(TemporalType.DATE)
    private Date dateNaissance;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Sexe sexe;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SituationFamiliale situation; //situation familiale

    @Column
    private State state ;

    private int nss;
    private int numIdentite;
    private int age;

    @JsonIgnore
    @ManyToMany(mappedBy = "personnels",fetch = FetchType.LAZY)
    private List<Operation> operations;






}
