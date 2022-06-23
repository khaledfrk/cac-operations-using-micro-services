package com.example.msoperation.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Embeddable;
import java.io.Serializable;
@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProtocoleAnesthesie implements Serializable {
    private String technique;
    private String sitePonction;
    private String materiel;
    private String agent;
    private String nature;
    private Double doseInduction;
    private Double doseEntretien;

}
