package com.medbtissam.gestiondestock.services.implimentation;

import com.medbtissam.gestiondestock.dto.NotificationDto;
import com.medbtissam.gestiondestock.repositories.NotificationRepository;
import com.medbtissam.gestiondestock.repositories.exceptions.EntityNotFoundException;
import com.medbtissam.gestiondestock.repositories.exceptions.ErrorCodes;
import com.medbtissam.gestiondestock.services.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    public final NotificationRepository notificationRepository;

    @Override
    public NotificationDto save(NotificationDto dto) {
        return NotificationDto.fromNotification(
                notificationRepository.save(NotificationDto.toNotification(dto))
        );
    }

    @Override
    public NotificationDto findById(Integer id) {
        return notificationRepository.findById(id)
                .map(NotificationDto::fromNotification).orElseThrow(
                        ()-> new EntityNotFoundException("aucune notification n'a été trouvé avec l'id "+id, ErrorCodes.NOTIFICATION_NOT_FOUND)
                );
    }

    @Override
    public List<NotificationDto> findAll() {
        return notificationRepository.findAll().stream()
                .map(NotificationDto::fromNotification)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Integer id) {
        notificationRepository.deleteById(id);
    }
}
