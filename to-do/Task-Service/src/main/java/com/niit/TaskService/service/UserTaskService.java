package com.niit.TaskService.service;

import com.niit.TaskService.exception.TaskUserAlreadyExist;
import com.niit.TaskService.model.Task;
import com.niit.TaskService.model.UserProfile;
import com.niit.TaskService.model.UserTask;

import java.util.List;

public interface UserTaskService {

    int sequenceGenerator(String sequenceName);
    public UserTask saveUserTask(UserTask userTask) throws TaskUserAlreadyExist;

    public UserTask updateExistingUserTasks(String emailId, int sr, Task task);//&
//     public UserTask findByEmailAndPassword(String emailId, String password);
    public  UserTask getUserByEmailId(String emailId);//#
    public UserTask addTaskToList(Task task, String email);

    public UserTask addTaskToArchive(Task task, String emailId);

    public UserTask addTaskToCompletedList(Task task, String emailId);

    boolean markTaskAsCompleted(String emailId, int sr);

   public UserTask deleteTaskFromList(String emailId,int sr);

    public UserTask deleteTaskFromCompletedList(String emailId,int sr);

    public UserTask deleteTaskFromArchiveList(String emailId,int sr);


    public UserTask updateExistingUserTasks(String emailId,UserTask userTask) ;


    public UserTask deleteTaskFromArchive(String emailId,int sr);

    public UserTask addUserProfile(UserProfile userProfile, String emailId);



}
