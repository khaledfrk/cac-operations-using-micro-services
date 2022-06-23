package com.example.msoperation.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Employee {


    @Id
    @Column(insertable=false ,updatable=false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idEmployee;

    private String firstName;

    private String lastName;

    private String mail;

    private String password;
    @Embedded
    private Adresse adresse;
}
