package com.example.msoperation.DOA;

import com.example.msoperation.Entities.Details;
import com.example.msoperation.Entities.Produit_Utilise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepo extends JpaRepository<Produit_Utilise, Long> {
}
