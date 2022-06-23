package com.example.msoperation.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class PersonConfidence {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idPerson;
    private String nom;
    private String prenom;
    private int numTel;
    @Embedded
    private Adresse adresse;

    @OneToOne
    @JsonIgnore
    private Patient patient;
}
