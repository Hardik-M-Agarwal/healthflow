package com.healthflow.activityservice.service;

import com.healthflow.activityservice.entity.Activity;
import com.healthflow.activityservice.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository activityRepository;

    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }

    public Optional<Activity> getActivityById(Long id) {
        return activityRepository.findById(id);
    }

    public Activity createActivity(Activity activity) {
        return activityRepository.save(activity);
    }

    public Activity updateActivity(Long id, Activity activityDetails) {
        Optional<Activity> optionalActivity = activityRepository.findById(id);
        if (optionalActivity.isPresent()) {
            Activity activity = optionalActivity.get();
            activity.setCalories(activityDetails.getCalories());
            activity.setDescription(activityDetails.getDescription());
            activity.setType(activityDetails.getType());
            activity.setCategory(activityDetails.getCategory());
            activity.setUserId(activityDetails.getUserId());
            return activityRepository.save(activity);
        }
        return null;
    }

    public boolean deleteActivity(Long id) {
        if (activityRepository.existsById(id)) {
            activityRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Activity> getActivitiesByUserId(Long userId) {
        return activityRepository.findByUserId(userId);
    }

    public List<Activity> getUserActivities(Long userId) {
        return activityRepository.findByUserId(userId);
    }

    public Double calculateUserCalories(Long userId) {
        List<Activity> activities = activityRepository.findByUserId(userId);
        double netCalories = 0.0;
        for (Activity activity : activities) {
            if ("BURN".equalsIgnoreCase(activity.getType())) {
                netCalories -= activity.getCalories();
            } else if ("INTAKE".equalsIgnoreCase(activity.getType())) {
                netCalories += activity.getCalories();
            }
        }
        return netCalories;
    }

    public List<Activity> getActivitiesByCategory(Long userId, String category) {
        return activityRepository.findByUserIdAndCategory(userId, category);
    }
}