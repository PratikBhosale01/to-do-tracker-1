/*
 * Author : Pratik Bhosale
 * Date : $(DATE)
 * created with : IntelliJ IDEA Community Edition
 */


package com.niit.org.UserAuthentication.service;

import com.niit.org.UserAuthentication.exception.UserAlreadyExistException;
import com.niit.org.UserAuthentication.exception.UserNotFoundException;
import com.niit.org.UserAuthentication.model.User;
import com.niit.org.UserAuthentication.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private UserRepo userRepo;
    @Autowired
    public UserServiceImpl(UserRepo userRepo){
        this.userRepo=userRepo;
    }


    @Override
    public User registerUser(User user) throws UserAlreadyExistException {
        if(userRepo.findById(user.getEmailId()).isPresent()){
           throw new UserAlreadyExistException();
        }
        return userRepo.save(user);
    }

    @Override
    public User findByEmailIdAndPassword(String emailId, String password) throws UserNotFoundException {
        User user = userRepo.findByEmailIdAndPassword(emailId,password);

        if (user!=null){
            return user;
        }else {
            throw new UserNotFoundException();
        }
    }

//
//    @Override
//    public User loginCheck(User user) {
//        return null;
//    }
}
