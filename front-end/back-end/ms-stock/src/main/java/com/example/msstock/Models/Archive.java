package com.example.msstock.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

import javax.persistence.Embedded;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.sql.Time;
@Data @NoArgsConstructor @AllArgsConstructor
public class Archive {
    private Long productId;
    private String nomP;
    private int qntP;
}
