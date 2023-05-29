/*
 * Author : Pratik Bhosale
 * Date : $(DATE)
 * created with : IntelliJ IDEA Community Edition
 */


package com.niit.TaskService.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Document
public class Task {
    @Transient
    public  static  final String SEQUENCE_NAME = "user_sequence";
    @Id
    private int sr;
    private String title;
    private String des;
    private String addOnDate;
    private String date;
    private Priority priorityLevel;
    private String category;
    private boolean isCompleted = false;

}
