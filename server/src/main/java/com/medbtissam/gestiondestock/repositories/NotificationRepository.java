package com.medbtissam.gestiondestock.repositories;

import com.medbtissam.gestiondestock.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {

    List<Notification> findAllByOrderByIdDesc();

}
