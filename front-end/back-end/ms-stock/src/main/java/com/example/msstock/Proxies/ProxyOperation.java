package com.example.msstock.Proxies;

import com.example.msstock.Models.Archive;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Collection;
import java.util.List;

@RepositoryRestResource
@FeignClient(name = "OPERATION-SERVICE", url="localhost:8081")
public interface ProxyOperation {
    @GetMapping("rsu/productsUpdated")
    List<Archive> getDetail();
}
