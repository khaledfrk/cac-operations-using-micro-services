package esi_cardio.com.auth_cardio.service;

import esi_cardio.com.auth_cardio.entity.UserDAO;
import esi_cardio.com.auth_cardio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;



    @Autowired
    private RestTemplate restTemplate;


        //get methods
        public List<UserDAO> getUsers(){
            return userRepository.findAll();
        }

        public UserDAO getUserById(Long idUsr){
            return userRepository.findById(idUsr).orElse(null);
        }

        public UserDAO getUserByUsername(String Usr){
            return userRepository.findUserDAOByUsername(Usr);
         }


    // get methode Medecin ---------------------------------------------------------



    //delete method
        public void deleteUser(Long idUsr){
            userRepository.deleteById(idUsr);
            //return "User Removed "+idUsr;
        }

        //update method
        public UserDAO updateUser(UserDAO user){
            UserDAO exsistingUser = userRepository.findById(user.getId()).orElse(null);
            exsistingUser.setUsername(user.getUsername());
            exsistingUser.setTelephone(user.getTelephone());
            exsistingUser.setRole(user.getRole());
            exsistingUser.setState(user.getState());
            //exsistingUser.setParent(user.getParent());


            return userRepository.save(exsistingUser);
        }



    //update method Patient----not in github yet--------------------------------------------------------



    public List<UserDAO> getAllMedecins(){
        return userRepository.getAllMedecins();
    }



}
