package com.niit.org.UserAuthentication.service;

import com.niit.org.UserAuthentication.model.User;

import java.util.Map;

public interface SecurityTokenGenerator {
    public abstract Map<String, String> generateToken(User user);
}
