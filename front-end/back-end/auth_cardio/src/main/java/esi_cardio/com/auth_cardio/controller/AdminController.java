package esi_cardio.com.auth_cardio.controller;


import esi_cardio.com.auth_cardio.entity.Personnel;
import esi_cardio.com.auth_cardio.entity.UserDAO;
import esi_cardio.com.auth_cardio.repository.PersonnelRepository;
import esi_cardio.com.auth_cardio.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("Admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private PersonnelRepository personnelRepository;

    @GetMapping("users/{id}")
    public UserDAO getUserById(@PathVariable(name = "id") Long idUsr){
        return userService.getUserById(idUsr);
    }

    @GetMapping("/personnel/all") //GET http://localhost:8081/rsu/personnel/all
    public List<Personnel> getPersonnels() {
        return personnelRepository.findAll();
    }

}
