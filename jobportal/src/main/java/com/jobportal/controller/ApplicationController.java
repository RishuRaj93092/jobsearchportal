package com.jobportal.controller;

import com.jobportal.entity.Application;
import com.jobportal.service.ApplicationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:3000") 
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping("/apply")
    public Application applyJob(@RequestBody Application application) {
        return applicationService.applyJob(application);
    }

    @GetMapping("/my-applications/{applicantId}")
    public List<Application> getMyApplications(@PathVariable Long applicantId) {
        return applicationService.getApplicationsByApplicant(applicantId);
    }

    @GetMapping("/by-job/{jobId}")
    public List<Application> getApplicationsByJob(@PathVariable Long jobId) {
        return applicationService.getApplicationsByJob(jobId);
    }

    @PutMapping("/update-status/{applicationId}")
    public Application updateStatus(@PathVariable Long applicationId, @RequestParam String status) {
        Application application = applicationService.getApplicationById(applicationId);
        application.setStatus(status);
        return applicationService.applyJob(application);
    }
}
