package com.medbtissam.gestiondestock.controllers;

import com.medbtissam.gestiondestock.controllers.api.NotificationApi;
import com.medbtissam.gestiondestock.dto.NotificationDto;
import com.medbtissam.gestiondestock.services.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class NotificationController implements NotificationApi {

    public final NotificationService notificationService;

    @Override
    public NotificationDto save(NotificationDto dto) {
        return notificationService.save(dto);
    }

    @Override
    public NotificationDto findById(Integer id) {
        return notificationService.findById(id);
    }

    @Override
    public List<NotificationDto> findAll() {
        return notificationService.findAll();
    }

    @Override
    public void delete(Integer id) {
        notificationService.delete(id);
    }
}
