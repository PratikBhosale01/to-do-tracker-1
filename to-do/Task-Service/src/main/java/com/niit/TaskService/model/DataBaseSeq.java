/*
 * Author : Pratik Bhosale
 * Date : $(DATE)
 * created with : IntelliJ IDEA Community Edition
 */


package com.niit.TaskService.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection = "db_sequence")
public class DataBaseSeq {
    @Id
    private String id;
    private int sequenceNumber;

}
