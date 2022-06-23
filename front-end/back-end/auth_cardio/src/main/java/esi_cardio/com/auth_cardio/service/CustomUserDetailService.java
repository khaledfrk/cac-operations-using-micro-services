package esi_cardio.com.auth_cardio.service;

import esi_cardio.com.auth_cardio.entity.Personnel;
import esi_cardio.com.auth_cardio.entity.UserDAO;
import esi_cardio.com.auth_cardio.repository.PersonnelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class CustomUserDetailService implements UserDetailsService {
    @Autowired
    private PersonnelRepository personnelRepository;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        List<SimpleGrantedAuthority> roles=null;
        Personnel user = personnelRepository.findPersonnelByUsername(username);
        if (user != null) {
            if(user.getState().equals(UserDAO.State.ACTIVE)){
                roles = Arrays.asList(new SimpleGrantedAuthority(user.getRole()));
                return new User(user.getUsername(), user.getPassword(), roles);
            }else if (user.getState().equals(UserDAO.State.INACTIVE)){
                 // show apropriate msg if user is inactive
                    throw new DisabledException("User Disabled : " + username);
            }
        }

        throw new UsernameNotFoundException("User not found with username: " + username);
    }

    public Personnel save(Personnel user) {

            Personnel newUser = new Personnel();
            newUser.setUsername(user.getUsername());
            newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
            newUser.setRole(user.getRole());
            newUser.setState(user.getState());
            newUser.setNumTel(user.getNumTel());
            newUser.setAdresse((user.getAdresse()));
            newUser.setDateNaissance(user.getDateNaissance());
            newUser.setNom(user.getNom());
            newUser.setAge(user.getAge());
            newUser.setNss(user.getNss());
            newUser.setNumIdentite(user.getNumIdentite());
            newUser.setPrenom(user.getPrenom());
            newUser.setSexe(user.getSexe());
            newUser.setSituation(user.getSituation());

            return personnelRepository.save(newUser);

    }

}
