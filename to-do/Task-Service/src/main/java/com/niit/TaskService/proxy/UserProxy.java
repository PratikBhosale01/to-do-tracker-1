package com.niit.TaskService.proxy;

import com.niit.TaskService.model.UserTask;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name ="User-Authentication-service",url = "http://localhost:8085")
public interface UserProxy {

    @PostMapping("/userService/register")
    public ResponseEntity<?> saveUser(@RequestBody UserTask userTask);
}
