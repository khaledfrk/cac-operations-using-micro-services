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
public class DrainageExterne implements Serializable {
    private String typeDrainage;
    private Integer nbDrainage;
    private String topographieDrainage;
}
