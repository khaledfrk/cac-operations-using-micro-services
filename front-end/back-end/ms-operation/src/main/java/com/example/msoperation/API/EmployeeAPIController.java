package com.example.msoperation.API;

import com.example.msoperation.DOA.EmployeeRepository;
import com.example.msoperation.Entities.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class EmployeeAPIController {
    @Autowired
    EmployeeRepository employeeRepository;

    @PostMapping("/a")
    @ResponseBody
    public String createNewEmploye(@RequestParam(name = "firstName") String firstName,
                                     @RequestParam(name = "lastName") String lastName,
                                     @RequestParam(name = "email") String mail) {
        Employee e = new Employee();
        e.setFirstName(firstName);
        e.setLastName(lastName);
        e.setMail(mail);
        employeeRepository.save(e);
        System.out.println("cccccccccccccccccccccccccccccccccccccccccccccccc\n");
        return "saved";
    }

}
