/*
 * Author : Pratik Bhosale
 * Date : $(DATE)
 * created with : IntelliJ IDEA Community Edition
 */


package com.niit.org.UserAuthentication.controller;

import com.niit.org.UserAuthentication.exception.UserAlreadyExistException;
import com.niit.org.UserAuthentication.exception.UserNotFoundException;
import com.niit.org.UserAuthentication.model.User;
import com.niit.org.UserAuthentication.service.SecurityTokenGenerator;
import com.niit.org.UserAuthentication.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RequestMapping("/userService")
@RestController
public class UserController {

    private UserService userService;
   private  SecurityTokenGenerator securityTokenGenerator;

    @Autowired
    public UserController(UserService userService , SecurityTokenGenerator securityTokenGenerator)
    {
        this.userService = userService;
        this.securityTokenGenerator = securityTokenGenerator;

    }
    @PostMapping("/register")
    public ResponseEntity<?> saveUser(@RequestBody User user) throws UserAlreadyExistException {
        return  new ResponseEntity<>(userService.registerUser(user), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginCheck(@RequestBody User user ) throws UserNotFoundException {
        Map<String, String> map=null;
        try{
            User result = userService.findByEmailIdAndPassword(user.getEmailId(),user.getPassword());

            map= securityTokenGenerator.generateToken(result);
            return new ResponseEntity<>(map,HttpStatus.OK);
        }
        catch(UserNotFoundException ex){
            throw new UserNotFoundException();
        }
        catch(Exception ex){
            return new ResponseEntity<>("Other exception",HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
