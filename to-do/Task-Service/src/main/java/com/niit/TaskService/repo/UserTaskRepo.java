package com.niit.TaskService.repo;

import com.niit.TaskService.model.UserTask;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserTaskRepo extends MongoRepository<UserTask,String> {
    public UserTask findByEmailIdAndPassword(String emailId, String password);
    public UserTask findByEmailId(String emailId);
}
