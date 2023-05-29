/*
 * Author : Pratik Bhosale
 * Date : $(DATE)
 * created with : IntelliJ IDEA Community Edition
 */


package com.niit.TaskService.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.CONFLICT,reason = "user already there")
public class TaskUserAlreadyExist extends Exception{
}
