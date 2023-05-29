package com.niit.org.UserAuthentication.repository;

import com.niit.org.UserAuthentication.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User,String> {

    User findByEmailIdAndPassword(String emailId, String password);
}
