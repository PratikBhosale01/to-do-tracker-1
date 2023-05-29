package com.niit.org.UserAuthentication.service;

import com.niit.org.UserAuthentication.exception.UserAlreadyExistException;
import com.niit.org.UserAuthentication.exception.UserNotFoundException;
import com.niit.org.UserAuthentication.model.User;

public interface UserService {

    User registerUser(User user) throws UserAlreadyExistException;

    User findByEmailIdAndPassword(String emailId, String password) throws UserNotFoundException;

//    User loginCheck(User user);
}
