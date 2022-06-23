package com.example.msoperation.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


import javax.persistence.*;
import java.util.Collection;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Patient{

    @Id
    @Column(insertable=false ,updatable=false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPatient;
    private String nom;
    private String prenom;

    @Enumerated(EnumType.STRING)
    //@Column(nullable = false)
    private Sexe sexe;
    private int age;

    @Temporal(TemporalType.DATE)
    private Date DateNaissance;
    private String LieuNaissance;
    private String profession;
    private int nSecurite;
    private int nIdentite;
    private int numTel;
    @Embedded
    private Adresse adresse;
    private SituationFamiliale situation; //situation familiale
    private String bloodType;
    private Double height;
    private Double weight;
    private String exposition;

    @OneToOne(mappedBy = "patient")
    private PersonConfidence personneConfiance;

    @JsonIgnore
    //@JsonManagedReference
    @OneToMany(mappedBy = "patient", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Collection<Operation> operations;




}
