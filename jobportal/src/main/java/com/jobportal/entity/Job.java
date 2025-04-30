package com.jobportal.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "jobs")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String companyName;
    private String location;
    private String salary;
    private String description;

    private Long companyId; 
}
