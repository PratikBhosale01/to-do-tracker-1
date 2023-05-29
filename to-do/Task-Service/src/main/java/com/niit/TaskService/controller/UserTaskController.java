/*
 * Author : Pratik Bhosale
 * Date : $(DATE)
 * created with : IntelliJ IDEA Community Edition
 */


package com.niit.TaskService.controller;

import com.niit.TaskService.exception.TaskUserAlreadyExist;
import com.niit.TaskService.model.Task;
import com.niit.TaskService.model.UserProfile;
import com.niit.TaskService.model.UserTask;
import com.niit.TaskService.service.UserTaskService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;


@RequestMapping("/usertask/")
@RestController
public class UserTaskController {
    ResponseEntity responseEntity;
    UserTaskService userTaskService;


    @Autowired
    public UserTaskController(UserTaskService userTaskService) {
        this.userTaskService = userTaskService;
    }


    @PostMapping("/usertask")//
    public ResponseEntity<?> saveUserTask(@RequestBody UserTask userTask) {

        UserTask userTask1;
        try {
            userTask1 = userTaskService.saveUserTask(userTask);
        } catch (TaskUserAlreadyExist e) {
            throw new RuntimeException(e);
        }
        responseEntity = new ResponseEntity<>(userTask1, HttpStatus.CREATED);

        return responseEntity;

    }




    @GetMapping("/user/{emailId}")//*
    public ResponseEntity<?> getUser(@PathVariable("emailId") String emailId) {

        responseEntity = new ResponseEntity<>(userTaskService.getUserByEmailId(emailId), HttpStatus.OK);

        return responseEntity;
    }
//    @PutMapping("/user/{emailId}/task/{sr}/title")
//    public ResponseEntity<?> updateTaskTitle(@PathVariable("emailId") String emailId, @PathVariable("sr") int sr, @RequestBody String title)  {
//
//            return new ResponseEntity<>(userTaskService.updateTaskTitle(emailId, sr, title), HttpStatus.OK);
//    }

//    @PutMapping("/user/{emailId}/task/{sr}/des")
//    public ResponseEntity<?> updateTaskDes(@PathVariable("emailId") String emailId, @PathVariable("sr") int sr, @RequestBody String des)  {
//
//            return new ResponseEntity<>(userTaskService.updateTaskDes(emailId,sr,des), HttpStatus.OK);
//
//    }

//    @PutMapping("/user/{emailId}/task/{sr}/date")
//    public ResponseEntity<?> updateTaskDate(@PathVariable("emailId") String emailId, @PathVariable("sr") int sr, @RequestBody String date)  {
//
//            return new ResponseEntity<>(userTaskService.updateTaskDate(emailId, sr, date), HttpStatus.OK);
//
//    }
//    @PutMapping("/user/{emailId}/task/{sr}/priority")
//    public ResponseEntity<?> updateTaskPriorityLevel(@PathVariable("emailId") String emailId, @PathVariable("sr") int sr, @RequestBody String priorityLevel) {
//
//            return new ResponseEntity<>(userTaskService.updateTaskPriority(emailId, sr, priorityLevel), HttpStatus.OK);
//
//    }
//    @PutMapping("/user/{emailId}/task/{sr}/category")
//    public ResponseEntity<?> updateTaskCategory(@PathVariable("emailId") String emailId, @PathVariable("sr") int sr, @RequestBody String category) {
//
//            return new ResponseEntity<>(userTaskService.updateTaskCategory(emailId, sr, category), HttpStatus.OK);
//
//    }
    @PutMapping("/user/{emailId}/task/{sr}/mark-complete")
    public ResponseEntity<?> markTaskAsComplete(@PathVariable("emailId") String emailId, @PathVariable("sr") int sr)  {

            return new ResponseEntity<>(userTaskService.markTaskAsCompleted(emailId,sr), HttpStatus.OK);

    }



    @PostMapping("/update/{sr}/{emailId}")//.
    public ResponseEntity<?> updateTasks(@PathVariable int sr, @PathVariable String emailId, @RequestBody Task task) {

        responseEntity = new ResponseEntity<>(userTaskService.updateExistingUserTasks(emailId, sr, task), HttpStatus.CREATED);

        return responseEntity;

    }

    @DeleteMapping("/user/delete/{sr}/{emailId}")//.
    public ResponseEntity<?> delete(@PathVariable int sr, @PathVariable String emailId) {

        responseEntity = new ResponseEntity<>(userTaskService.deleteTaskFromList(emailId, sr), HttpStatus.OK);

        return responseEntity;
    }

    @DeleteMapping("/user/deleteCompletedList/{sr}/{emailId}")//.
    public ResponseEntity<?>deleteTaskFromCompletedList(@PathVariable int sr, @PathVariable String emailId) {

        responseEntity = new ResponseEntity<>(userTaskService.deleteTaskFromCompletedList(emailId, sr), HttpStatus.OK);

        return responseEntity;
    }

    @DeleteMapping("/user/deleteArchiveList/{sr}/{emailId}")//.
    public ResponseEntity<?>deleteTaskFromArchiveList(@PathVariable int sr, @PathVariable String emailId) {

        responseEntity = new ResponseEntity<>(userTaskService.deleteTaskFromArchiveList(emailId, sr), HttpStatus.OK);

        return responseEntity;
    }



    @PostMapping("/user/{emailId}/task")
    public ResponseEntity<?> saveTaskToList(@PathVariable("emailId") String emailId, @RequestBody Task task) {
        task.setSr(userTaskService.sequenceGenerator(Task.SEQUENCE_NAME));
        ResponseEntity responseEntity = new ResponseEntity(userTaskService.addTaskToList(task, emailId), HttpStatus.OK);


        return responseEntity;
    }

    @PostMapping("update/{emailId}")
    public ResponseEntity<?> updateTasks(@PathVariable String emailId,@RequestBody UserTask userTask){

        responseEntity=new ResponseEntity<>(userTaskService.updateExistingUserTasks(emailId,userTask) ,HttpStatus.CREATED);

        return responseEntity;

    }

    @PostMapping("/user/{emailId}/archive")
    public ResponseEntity<?> saveTaskToArchive(@PathVariable("emailId") String emailId, @RequestBody Task task) {

        responseEntity = new ResponseEntity(userTaskService.addTaskToArchive(task, emailId), HttpStatus.OK);


        return responseEntity;
    }

    @PostMapping("/user/{emailId}/completed")
    public ResponseEntity<?> saveTaskToCompletedList(@PathVariable("emailId") String emailId, @RequestBody Task task){
        responseEntity = new ResponseEntity(userTaskService.addTaskToCompletedList(task, emailId), HttpStatus.OK);


        return responseEntity;

    }
    @PostMapping("/user/{emailId}/userProfile")
    public ResponseEntity<?> addUserProfile(@PathVariable("emailId") String emailId, @RequestBody UserProfile userProfile){
        responseEntity = new ResponseEntity(userTaskService.addUserProfile(userProfile,emailId), HttpStatus.OK);


        return responseEntity;

    }



}
