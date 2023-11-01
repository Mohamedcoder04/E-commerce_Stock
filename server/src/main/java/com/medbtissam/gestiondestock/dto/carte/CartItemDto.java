package com.medbtissam.gestiondestock.dto.carte;

import com.medbtissam.gestiondestock.dto.ProductDto;
import lombok.Data;

@Data
public class CartItemDto {
    private Integer id;
    private Integer quantity;
    private ProductDto productDto;

}
