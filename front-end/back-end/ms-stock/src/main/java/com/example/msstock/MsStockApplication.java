package com.example.msstock;


import com.example.msstock.Entities.Categorie;
import com.example.msstock.Entities.Product;
import com.example.msstock.Repository.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

import java.sql.Date;


@EnableFeignClients
@SpringBootApplication
public class MsStockApplication implements  CommandLineRunner {
     
    @Autowired
    ProductRepo productRepo;

    public static void main(String[] args) {
        SpringApplication.run(MsStockApplication.class, args);
    }
    @Override
    public void run(String... args) throws Exception {
        
        Product p1 = productRepo.save(new Product(null,"prod1",250,"antibiotique", Categorie.Consomable,3000.0, Date.valueOf("2023-12-04"),12,"nlot"));

        Product p2 = productRepo.save(new Product(null,"prod2",250,"antibiotique", Categorie.Consomable,3000.0, Date.valueOf("2023-12-04"),12,"nlot"));
        Product p3 = productRepo.save(new Product(null,"prod3",250,"antibiotique", Categorie.Consomable,3000.0, Date.valueOf("2023-12-04"),12,"nlot"));
        Product p4 = productRepo.save(new Product(null,"prod4",250,"antibiotique",Categorie.Consomable,3000.0, Date.valueOf("2023-12-04"),12,"nlot"));
        Product p5 = productRepo.save(new Product(null,"prod5",200,"antibiotique", Categorie.Consomable,3000.0, Date.valueOf("2023-12-04"),12,"nlot"));
        Product p6 = productRepo.save(new Product(null,"prod6",250,"antibiique", Categorie.Consomable,3000.0, Date.valueOf("2023-12-04"),12,"nlot"));
    }

}
