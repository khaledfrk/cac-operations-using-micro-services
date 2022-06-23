package com.example.msoperation.Entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.io.Serializable;
import java.time.DateTimeException;
import java.time.LocalDateTime;
import java.util.Date;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Reveil implements Serializable {

    @Column(nullable = true)
    private String nomReveil;
    @Column(nullable = true)
    private int nbLitsReveil;
    @Column(nullable = true)
    private String dureeReveil;
    @Column(nullable = true)
    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
    private LocalDateTime dateDebutReveil;
    @Column(nullable = true)
    @DateTimeFormat(iso = DateTimeFormat.ISO.TIME)
    private LocalDateTime dateFinReveil;

}
