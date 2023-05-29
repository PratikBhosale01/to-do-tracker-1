/*
 * Author : Pratik Bhosale
 * Date : $(DATE)
 * created with : IntelliJ IDEA Community Edition
 */


package com.niit.org.UserAuthentication.service;

import com.niit.org.UserAuthentication.model.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
@Service
public class SecurityTokenGeneratorIMPl implements SecurityTokenGenerator{
    @Override
    public Map<String, String> generateToken(User user) {
        String token = null;
        Map<String, Object> claims = new HashMap<>();
        claims.put("emailId",user.getEmailId());
//        claims.put("role",user.getRole());
//        System.out.println(user.getRole());
//        System.out.println(user.getEmail());
        System.out.println(claims);

        token = generateToken(claims,user.getEmailId());
        Map<String, String> result = new HashMap<>();
        result.put("token",token);
        result.put("message","Successfully Logged In");
//        result.put("role", user.getRole());
        result.put("emailId",user.getEmailId());

        return result;
    }

    public String generateToken(Map<String,Object> claims, String subject){
        String jwtToken = Jwts.builder().setIssuer("PD-Auth")
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date())
                .signWith(SignatureAlgorithm.HS256,"pdkey")
                .compact();

        return jwtToken;

    }
}