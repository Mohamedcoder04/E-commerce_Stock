package com.medbtissam.gestiondestock.controllers.api;

import com.medbtissam.gestiondestock.dto.NotificationDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/notification")
@Tag(name = "notification")
public interface NotificationApi {

    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    NotificationDto save(@RequestBody NotificationDto dto);

    @GetMapping(value = "/notification/{id}")
    NotificationDto findById(Integer id);

    @GetMapping(value = "/all")
    List<NotificationDto> findAll();

    @DeleteMapping(value = "/delete-notification/{id}")
    void delete(Integer id);
}
