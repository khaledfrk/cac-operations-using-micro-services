package com.example.msoperation.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data

@AllArgsConstructor
@NoArgsConstructor
@ToString
public class StatObj {
    private String nom;
    private  int nbOperation;
}
