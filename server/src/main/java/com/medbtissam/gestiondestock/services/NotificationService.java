package com.medbtissam.gestiondestock.services;

import com.medbtissam.gestiondestock.dto.NotificationDto;

import java.util.List;

public interface NotificationService {

    NotificationDto save(NotificationDto dto);

    NotificationDto findById(Integer id);

    List<NotificationDto> findAll();

    void delete(Integer id);
}
