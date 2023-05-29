/*
 * Author : Pratik Bhosale
 * Date : $(DATE)
 * created with : IntelliJ IDEA Community Edition
 */


package com.niit.TaskService.service;

import com.niit.TaskService.exception.TaskUserAlreadyExist;
import com.niit.TaskService.model.*;
import com.niit.TaskService.proxy.UserProxy;
import com.niit.TaskService.repo.UserTaskRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Service
public class UserTaskServiceImpl implements UserTaskService {
    private UserProxy userProxy;
    @Autowired
    private MongoOperations mongoOperations;
    UserTaskRepo userTaskRepo;

    @Autowired
    JavaMailSender javaMailSender;
    @Value("${spring.mail.username}")
    private String sender;
    @Autowired
    public UserTaskServiceImpl(UserProxy userProxy, UserTaskRepo userTaskRepo) {
        this.userProxy = userProxy;
        this.userTaskRepo = userTaskRepo;
    }

    @Override
    public int sequenceGenerator(String sequenceName) {
        Query query = new Query(Criteria.where("id").is(sequenceName));
        Update update =new Update().inc("sequenceNumber",1);
        DataBaseSeq counter = mongoOperations
                .findAndModify(query,update, FindAndModifyOptions.options()
                        .returnNew(true).upsert(true), DataBaseSeq.class);
        return !Objects.isNull(counter) ? counter.getSequenceNumber() : 1;
    }

    @Override
    public UserTask saveUserTask(UserTask userTask) throws TaskUserAlreadyExist {
        if(userTaskRepo.findById(userTask.getEmailId()).isPresent()){
            throw new TaskUserAlreadyExist();
        } UserTask userTask1= userTaskRepo.save(userTask);
        if(!(userTask1.getEmailId().isEmpty())){
            ResponseEntity r =userProxy.saveUser(userTask);
            System.out.println(r.getBody());
        }
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(sender);
        message.setTo(userTask.getEmailId());
        message.setSubject("To Do Application");
        String newline = System.lineSeparator();
        message.setText("You Registered our Todo Application successfully :"
                +newline+
                "Email Id : " + userTask.getEmailId()
                +newline+
                "Name : " + userTask.getUsername()
                +newline+
                "WelCome To ToDo Application  :) "  );

        javaMailSender.send(message);
        return userTask1;
    }



    @Override
    public UserTask updateExistingUserTasks(String emailId, int sr, Task task) {
        UserTask user = userTaskRepo.findByEmailId(emailId);
        List<Task> taskList = user.getTasks();
        for (Task t:taskList) {
            if(t.getSr() == sr) {
                t.setTitle(task.getTitle());
                t.setDes(task.getDes());
                t.setDate(task.getDate());
                t.setPriorityLevel(task.getPriorityLevel());
            }
        }
        user.setTasks(taskList);
        return userTaskRepo.save(user);
    }

//    @Override
//    public UserTask findByEmailAndPassword(String email, String password) {
//        return  userTaskRepo.findByEmailIdAndPassword(email, password);
//    }

    @Override
    public UserTask getUserByEmailId(String emailId) {
        return userTaskRepo.findByEmailId(emailId) ;
    }

    @Override
    public UserTask addTaskToList(Task task, String emailId) {

        UserTask user = userTaskRepo.findByEmailId(emailId);
        if(user.getTasks()==null){
            user.setTasks(Arrays.asList(task));
        }else {
            List<Task> contents = user.getTasks();
            contents.add(task);
            user.setTasks(contents);
        }
        return userTaskRepo.save(user);
    }

    @Override
    public UserTask addTaskToArchive(Task task, String emailId) {
        UserTask user = userTaskRepo.findByEmailId(emailId);
        if(user.getArchive()==null){
            user.setArchive(Arrays.asList(task));
        }else {
            List<Task> archives = user.getArchive();
            archives.add(task);
            user.setArchive(archives);
        }
        return userTaskRepo.save(user);
    }

    @Override
    public UserTask addTaskToCompletedList(Task task, String emailId) {
        UserTask user = userTaskRepo.findByEmailId(emailId);
        if(user.getCompleted()==null){
            user.setCompleted(Arrays.asList(task));
        }else {
            List<Task> completed = user.getCompleted();
            completed.add(task);
            user.setCompleted(completed);
        }
        return userTaskRepo.save(user);


    }


//    @Override
//    public String updateTaskTitle(String emailId, int sr, String heading) {
//        UserTask user = userTaskRepo.findByEmailId(emailId);
//        List<Task> userTasks = user.getTasks();
//        for (Task task : userTasks) {
//            if (task.getSr() == sr) {
//                userTasks.remove(task);
//                task.setTitle(heading);
//                userTasks.add(task);
//                user.setTasks(userTasks);
//                userTaskRepo.save(user);
//                return "The task's heading has been updated to: \n" + heading;
//            }
//        }return "Task with ID " + sr + " not found.";
//    }
//
//    @Override
//    public String updateTaskDes(String emailId, int sr, String des) {
//        UserTask user = userTaskRepo.findByEmailId(emailId);
//        List<Task> userTasks = user.getTasks();
//        for (Task task : userTasks) {
//            if (task.getSr() == sr) {
//                userTasks.remove(task);
//                task.setDes(des);
//                userTasks.add(task);
//                user.setTasks(userTasks);
//                userTaskRepo.save(user);
//                return "The task's content has been updated to: \n" + des;
//            }
//        }
//        return "Task with ID " + sr + " not found.";
//    }
//
//    @Override
//    public String updateTaskDate(String emailId, int sr, String date) {
//        UserTask user = userTaskRepo.findByEmailId(emailId);
//        List<Task> userTasks = user.getTasks();
//        for (Task task : userTasks) {
//            if (task.getSr() == sr) {
//                userTasks.remove(task);
//                task.setDate(date);
//                userTasks.add(task);
//                user.setTasks(userTasks);
//                userTaskRepo.save(user);
//                return "The task's due date has been updated to: \n" + date;
//            }
//        }
//        return "Task with ID " + sr + " not found.";
//    }
//
//    @Override
//    public String updateTaskPriority(String emailId, int sr, String priorityLevel) {
//        UserTask user = userTaskRepo.findByEmailId(emailId);
//        List<Task> userTasks = user.getTasks();
//        for (Task task : userTasks) {
//            if (task.getSr() == sr) {
//                userTasks.remove(task);
//                task.setPriorityLevel(Priority.valueOf(priorityLevel));
//                userTasks.add(task);
//                user.setTasks(userTasks);
//                userTaskRepo.save(user);
//                return "The task's priority level has been updated to: \n" + task.getPriorityLevel().toString();
//            }
//        }
//        return "Task with ID " + sr + " not found.";
//    }
//
//    @Override
//    public String updateTaskCategory(String emailId, int sr, String category) {
//        UserTask user = userTaskRepo.findByEmailId(emailId);
//        List<Task> userTasks = user.getTasks();
//        for (Task task : userTasks) {
//            if (task.getSr()== sr) {
//                userTasks.remove(task);
//                task.setCategory(category);
//                userTasks.add(task);
//                user.setTasks(userTasks);
//                userTaskRepo.save(user);
//                return "The task's category has been updated to: \n" + category;
//            }
//        }
//        return "Task with ID " + sr + " not found.";
//    }

    @Override
    public boolean markTaskAsCompleted(String emailId, int sr) {
        UserTask user = userTaskRepo.findByEmailId(emailId);
        List<Task> userTasks = user.getTasks();
        for (Task task : userTasks) {
            if (task.getSr() == sr) {
                userTasks.remove(task);
                task.setCompleted(true);
                userTasks.add(task);
                user.setTasks(userTasks);
                userTaskRepo.save(user);
                return task.isCompleted();
            }
        }
        return false;
    }

    @Override
    public UserTask deleteTaskFromList(String emailId, int sr) {
        UserTask user = userTaskRepo.findById(emailId).get();
        List<Task> TaskList = user.getTasks();

        TaskList.removeIf(x->x.getSr()==sr );
        user.setTasks(TaskList);
        return userTaskRepo.save(user);
    }

    @Override
    public UserTask deleteTaskFromCompletedList(String emailId, int sr) {
        UserTask user = userTaskRepo.findById(emailId).get();
        List<Task> TaskList = user.getCompleted();

        TaskList.removeIf(x->x.getSr()==sr );
        user.setCompleted(TaskList);
        return userTaskRepo.save(user);
    }

    @Override
    public UserTask deleteTaskFromArchiveList(String emailId, int sr) {
        UserTask user = userTaskRepo.findById(emailId).get();
        List<Task> TaskList = user.getArchive();

        TaskList.removeIf(x->x.getSr()==sr );
        user.setArchive(TaskList);
        return userTaskRepo.save(user);
    }

    @Override
    public UserTask updateExistingUserTasks(String emailId ,UserTask userTask) {
        UserTask user = userTaskRepo.findByEmailId(emailId);
//        user.setFirstName(userTask.getFirstName());
//        user.setLastName(userTask.getLastName());
//        user.setContact(userTask.getContact());
//        user.setUploadImage(userTask.getUploadImage());

        return userTaskRepo.save(user);
    }

    @Override
    public UserTask deleteTaskFromArchive(String emailId, int sr) {
        return null;
    }

    @Override
    public UserTask addUserProfile(UserProfile userProfile, String emailId) {
        UserTask user = userTaskRepo.findByEmailId(emailId);
        if (user != null) {
            user.setUserProfile(userProfile);
            return userTaskRepo.save(user);
        }
        return null;
    }

}
