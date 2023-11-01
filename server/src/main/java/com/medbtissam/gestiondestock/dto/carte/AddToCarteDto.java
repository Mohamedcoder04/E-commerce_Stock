package com.medbtissam.gestiondestock.dto.carte;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddToCarteDto {

    private Integer id;
    private Integer productId;
    private Integer quantite;


}
