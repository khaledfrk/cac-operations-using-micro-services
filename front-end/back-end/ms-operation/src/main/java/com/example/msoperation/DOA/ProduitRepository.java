package com.example.msoperation.DOA;

import com.example.msoperation.models.produit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProduitRepository  extends JpaRepository<produit, Long> {
}
