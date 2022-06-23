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
public class PiecesPrelevees implements Serializable {
    private String topographiePiecesPrelevees;
    private Double poids;
    private String orientation;
    private Integer numFlacon;
    private String typeFixation;
}
