package com.medbtissam.gestiondestock.dto;

import com.medbtissam.gestiondestock.model.Notification;
import lombok.Builder;
import lombok.Data;

@Data @Builder
public class NotificationDto {
    private Integer id;
    private String title;
    private String url;

    public static NotificationDto fromNotification(Notification notification){
        return NotificationDto.builder()
                .id(notification.getId())
                .title(notification.getTitle())
                .url(notification.getUrl())
                .build();
    }

    public static Notification toNotification(NotificationDto dto){
        Notification notification = new Notification();
        notification.setId(dto.getId());
        notification.setTitle(dto.getTitle());
        notification.setUrl(dto.getUrl());
        return notification;
    }
}
