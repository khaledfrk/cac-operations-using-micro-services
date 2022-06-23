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
public class Adresse implements Serializable {
    private String wilaya;
    private String daira;
    private String mairie;
}
