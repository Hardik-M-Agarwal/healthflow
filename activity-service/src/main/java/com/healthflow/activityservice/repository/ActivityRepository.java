package com.healthflow.activityservice.repository;

import com.healthflow.activityservice.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {
    List<Activity> findByUserId(Long userId);
    List<Activity> findByUserIdAndCategory(Long userId, String category);
}