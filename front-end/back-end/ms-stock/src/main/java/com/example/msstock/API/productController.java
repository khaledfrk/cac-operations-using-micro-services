package com.example.msstock.API;

import com.example.msstock.Entities.Categorie;
import com.example.msstock.Entities.Product;
import com.example.msstock.Entities.ProductEntree;
import com.example.msstock.Entities.ProductSortie;
import com.example.msstock.Models.Archive;
import com.example.msstock.Proxies.ProxyOperation;
import com.example.msstock.Repository.ProductERepo;
import com.example.msstock.Repository.ProductRepo;
import com.example.msstock.Repository.ProductSRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("stock")
public class productController {

    @Autowired
    ProductRepo productRepo;
    @Autowired
    ProductSRepo productSRepo;
    @Autowired
    ProductERepo productERepo;
    @Autowired
    ProxyOperation proxyOperation;

    //GET http://localhost:8081/stock/product/all

    @GetMapping("product/all")
    public List<Product> getProducts() {
        Product prod;
        List<Product> P = productRepo.findAll();
        List<Archive> d =  proxyOperation.getDetail();
        for(int i=0;i<d.size();i++) {
            for (int j = 0; j < P.size(); j++) {
                String nomP = d.get(i).getNomP();
                int q = d.get(i).getQntP();
                if ((P.get(j).getNomP()).equals(nomP)) {
                    prod = P.get(j);
                    prod.setQntP(P.get(j).getQntP()-q);
                    productRepo.save(prod);
                }
            }
        }
        return P; //http://localhost:8084/stock/product/all
    }



    @GetMapping("/product/{id}")
    public Product getProduct(@PathVariable(value = "id") Long id) {

        return productRepo.findProductByProductId(id);
    }

    //@RequestMapping("/product/nom/{nom}")
    //public Product findProductsByNom(@PathVariable String nom){
      //  return productRepo.findProductsByNomP( nom);
    //}
    //Quantite
    @RequestMapping("/product/qte")
    public List<Product> findProductsByQnt(@RequestParam(name="q") int q){
        return productRepo.findProductsByqntP(q);
    }

    @RequestMapping("/product/qteG")
    public List<Product> findProductsByQntGreater(@RequestParam(name="qG") int qG) { return productRepo.findByQntPGreaterThanEqual(qG);}

    @RequestMapping("/product/qteL")
    public List<Product> findByqntPLess(@RequestParam(name="qL") int qL){
        return productRepo.findByqntPLessThanEqual(qL);
    }
    //Type
    @RequestMapping("/product/type")
    public List<Product> findProductsByType(@RequestParam(name="type") String type){
        return productRepo.findProductsByTypePContaining(type);
    }
    //Prix
    @RequestMapping("/product/prixG")
    public List<Product> findProductsByPrixG(@RequestParam(name="prixG") double prixG){
        return productRepo.findByPrixPGreaterThanEqual(prixG);
    }
    @RequestMapping("/product/prixL")
    public List<Product> findProductsByPrixL(@RequestParam(name="prixL") double prixL){
        return productRepo.findByPrixPLessThanEqual(prixL);
    }

    @PostMapping("/product")
    @ResponseBody
    public Product insertProd(@RequestBody ProductEntree product){
        productERepo.save(product);
        Product p = new Product();
        p.setNomP(product.getNomP());
        p.setQntP(product.getQntP());
        p.setTypeP(product.getTypeP());
        p.setDelai(product.getDelai());
        p.setPrixP(product.getPrixP());
        p.setCategorie(product.getCategorie());
        p.setDatePeremption(product.getDatePeremption());
        p.setNlot(product.getNlot());
        productRepo.save(p);
        return p;
    }
    //@PathVariable(value = "id") Long idp,@RequestBody(name="nomP") String nomP,@RequestParam(name="typeP") String typeP, @RequestParam(name="q") int q,
    //@RequestParam(name="prixP") double prixP, @RequestParam(name="dateP") Date dateP, @RequestParam(name="delai") int delai

    @PutMapping("/product/update/{id}")
    public Product update(@PathVariable(value = "id") Long idp,
                          @RequestBody Map<Object, Object> payload){
        Product produit=productRepo.findById(idp).get();
        if( productRepo.findById(idp).isPresent()){
            int q = produit.getQntP();

            if(payload.get("nomP")!=null){
                produit.setNomP(payload.get("nomP").toString());

            }
            if(payload.get("datePeremption")!=null){
                produit.setDatePeremption(Date.valueOf(payload.get("datePeremption").toString()));

            }
            if(payload.get("typeP")!=null){
                produit.setTypeP(payload.get("typeP").toString());

            }
            if(payload.get("categorie")!=null){
                produit.setCategorie(Categorie.valueOf(payload.get("categorie").toString()));

            }

            if(payload.get("prixP")!=null){
                produit.setPrixP(Double.valueOf(payload.get("prixP").toString())); //"DatePeremption":"2000-05-11"

            }
            if(payload.get("delai")!=null){
                produit.setDelai(Integer.valueOf(payload.get("delai").toString()));

            }
            if(payload.get("nlot")!=null){
                produit.setNlot(payload.get("nlot").toString());

            }

            if(payload.get("qntP")!=null){
                produit.setQntP(Integer.valueOf(payload.get("qntP").toString()));
                if(Integer.valueOf(payload.get("qntP").toString())<q){
                    int dif = q-Integer.valueOf(payload.get("qntP").toString());
                    Long id = produit.getProductId();
                    System.out.println(id);
                    if(productSRepo.findById(id).isPresent()){
                        ProductSortie ps = productSRepo.findById(id).get();
                        ps.setQntP(ps.getQntP()+dif);
                    }else{
                        ProductSortie ps = new ProductSortie();
                        ps.setProductSId(produit.getProductId());
                        ps.setNomP(produit.getNomP());
                        ps.setQntP(dif);
                        ps.setTypeP(produit.getTypeP());
                        ps.setPrixP(produit.getPrixP());
                        productSRepo.save(ps);
                    }
                }
            }
            return productRepo.save(produit);
        }
        return produit;
    }


    @DeleteMapping("/product/delete/{id}")
    public Product deleteP(@PathVariable(value = "id") Long idp){
        Product pp =productRepo.findById(idp).get();
        if (productRepo.findById(idp).isPresent()) {
            ProductSortie ps = new ProductSortie();
            Product p = productRepo.findById(idp).get();
            ps.setProductSId(p.getProductId());
            ps.setNomP(p.getNomP());
            ps.setQntP(p.getQntP());
            ps.setTypeP(p.getTypeP());
            ps.setPrixP(p.getPrixP());
            ps.setCategorie(p.getCategorie());
            productSRepo.save(ps);
            productRepo.deleteById(idp);
        }
        return pp ;
    }

    @GetMapping("/product/alert")
    public List<Product> AfficherAlert(){
        long diff;
        float res;
        List<Product> s= new ArrayList<>();
        java.sql.Date today = new java.sql.Date(Calendar.getInstance().getTime().getTime());
        for(Product p : productRepo.findAll()){
            diff=p.getDatePeremption().getTime()-today.getTime();
            res=(diff / (1000*60*60*24));
            if(!(res>p.getDelai())){
                s.add(p);
            }
        }
        return s;
    }

}
