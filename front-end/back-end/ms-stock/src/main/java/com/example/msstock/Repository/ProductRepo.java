package com.example.msstock.Repository;

import com.example.msstock.Entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import java.util.List;

@RepositoryRestResource
public interface ProductRepo extends JpaRepository<Product,Long> {
    //http://localhost:8081/products/search/findProductsByNomP?nom=prod1
    Product findProductsByNomP(String nom);
    Product findProductByProductId(long id);
    List<Product> findProductsByTypeP(String type);
    List<Product> findProductsByqntP(int qte);
    List<Product> findByQntPGreaterThanEqual(int q);
    List<Product> findByqntPLessThanEqual(int q);
    List<Product> findProductsByTypePContaining(String type);
    List<Product> findByPrixPGreaterThanEqual(double prix);
    List<Product> findByPrixPLessThanEqual(double prix);
    //List<Product> findProductsByDatePéremption(Date Datep);
    //List<Product> findByTypePOrQntP(String p,int q);
}
