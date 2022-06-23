package esi_cardio.com.auth_cardio.service;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class JwtUtil {

    private String secret;
    private int jwtExpirationInMs;

    @Value("${jwt.secret}")
    public void setSecret(String secret) {
        this.secret = secret;
    }

    @Value("${jwt.expirationDateInMs}")
    public void setJwtExpirationInMs(int jwtExpirationInMs) {
        this.jwtExpirationInMs = jwtExpirationInMs;
    }

    // generate token for user
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        Collection<? extends GrantedAuthority> roles = userDetails.getAuthorities();
        if (roles.contains(new SimpleGrantedAuthority("ROLE_ADMIN"))) {
            claims.put("isAdmin", true);
        }
        if (roles.contains(new SimpleGrantedAuthority("ROLE_CHIRURGIEN"))) {
            claims.put("isChirurgien", true);
        }
        if (roles.contains(new SimpleGrantedAuthority("ROLE_INFERMIER"))) {
            claims.put("isInfermier", true);
        }
        if (roles.contains(new SimpleGrantedAuthority("ROLE_RESIDENT"))) {
            claims.put("isResident", true);
        }
        if (roles.contains(new SimpleGrantedAuthority("ROLE_INSTRUMENTISTE"))) {
            claims.put("isInstrumentiste", true);
        }
        if (roles.contains(new SimpleGrantedAuthority("ROLE_ANESTHESISTE"))) {
            claims.put("isAnesthesiste", true);
        }
        if (roles.contains(new SimpleGrantedAuthority("ROLE_COORDINATEUR"))) {
            claims.put("isCoordinateur", true);
        }
        // add other roles here
        return doGenerateToken(claims, userDetails.getUsername());
    }

    private String doGenerateToken(Map<String, Object> claims, String subject) {

        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationInMs)).signWith(SignatureAlgorithm.HS512, secret).compact();
    }


    public boolean validateToken(String authToken) {
        try {
            // Jwt token has not been tampered with
            Jws<Claims> claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException | MalformedJwtException | UnsupportedJwtException | IllegalArgumentException ex) {
            throw new BadCredentialsException("INVALID_CREDENTIALS", ex);
        } catch (ExpiredJwtException ex) {
            throw ex;
        }
    }

    public String getUsernameFromToken(String token) {
        Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();

        return claims.getSubject();
    }

    public List<SimpleGrantedAuthority> getRolesFromToken(String authToken) {
        List<SimpleGrantedAuthority> roles = null;
        Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(authToken).getBody();
        Boolean isAdmin = claims.get("isAdmin", Boolean.class);
        Boolean isChirurgien = claims.get("isChirurgien", Boolean.class);
        Boolean isInfermier = claims.get("isInfermier", Boolean.class);
        Boolean isResident = claims.get("isResident", Boolean.class);
        Boolean isInstrumentiste = claims.get("isInstrumentiste", Boolean.class);
        Boolean isAnesthesiste = claims.get("isAnesthesiste", Boolean.class);
        Boolean isCoordinateur = claims.get("isCoordinateur", Boolean.class);

        if (isAdmin != null && isAdmin == true) {
            roles = Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN"));
        }
        if (isChirurgien != null && isChirurgien == true) {
            roles = Arrays.asList(new SimpleGrantedAuthority("ROLE_CHIRURGIEN"));
        }
        if (isInfermier != null && isInfermier == true) {
            roles = Arrays.asList(new SimpleGrantedAuthority("ROLE_INFERMIER"));
        }
        if (isResident != null && isResident == true) {
            roles = Arrays.asList(new SimpleGrantedAuthority("ROLE_RESIDENT"));
        }
        if (isInstrumentiste != null && isInstrumentiste == true) {
            roles = Arrays.asList(new SimpleGrantedAuthority("ROLE_INSTRUMENTISTE"));
        }
        if (isAnesthesiste != null && isAnesthesiste == true) {
            roles = Arrays.asList(new SimpleGrantedAuthority("ROLE_ANESTHESISTE"));
        }
        if (isCoordinateur != null && isCoordinateur == true) {
            roles = Arrays.asList(new SimpleGrantedAuthority("ROLE_COORDINATEUR"));
        }
        return roles;
    }


}
