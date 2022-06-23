package com.example.msoperation.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SalleOperatoire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idS;
    private String nom;
    private int nbLits;

    @JsonIgnore
    @OneToMany(mappedBy = "salle", fetch = FetchType.EAGER)
    private List<Operation> operation;
}

