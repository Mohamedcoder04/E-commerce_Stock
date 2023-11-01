package com.medbtissam.gestiondestock.handlers;

import com.medbtissam.gestiondestock.repositories.exceptions.ErrorCodes;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data @Builder
@AllArgsConstructor @NoArgsConstructor
public class ErrorDto {
    private Integer httpCode;
    private ErrorCodes errorCodes;
    private String message;
    private List<String> errors = new ArrayList<>();
}
