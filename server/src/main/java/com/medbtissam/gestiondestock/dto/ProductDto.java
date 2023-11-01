package com.medbtissam.gestiondestock.dto;

import com.medbtissam.gestiondestock.model.Product;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class ProductDto {
    private Integer id;
    private String codeProduit;
    private String designation;
    private BigDecimal prixUnitaireHt; //hors tva
    private BigDecimal tauxTva;
    private BigDecimal prixUnitaireTtc;
    private String photo;
    private Integer numberSell;
    private boolean promo;
    private boolean selected;
    private boolean available;
    private Integer quantity = 0;

    private CategoryDto category;

    @JsonIgnore
    private List<MvtStkDto> mvtStks;

    @JsonIgnore
    private List<LigneVenteDto> ligneVentes;

    @JsonIgnore
    private List<LigneCommandeClientDto> ligneCommandeClients;

    @JsonIgnore
    private List<LigneCommandeFournisseurDto> ligneCommandeFournisseurs;



    public static ProductDto fromProduct(Product product) {
        if (product == null) throw new RuntimeException("Article not found!!");

        return ProductDto.builder()
                .id(product.getId())
                .codeProduit(product.getCodeProduit())
                .designation(product.getDesignation())
                .prixUnitaireHt(product.getPrixUnitaireHt())
                .tauxTva(product.getTauxTva())
                .prixUnitaireTtc(product.getPrixUnitaireTtc())
                .photo(product.getPhoto())
                .numberSell(product.getNumberSell())
                .available(product.isAvailable())
                .quantity(product.getQuantity())
                .selected(product.isSelected())
                .promo(product.isPromo())
                .category(CategoryDto.fromCategory(product.getCategory()))
                //.imagesProduct(product.getImagesProduct())
                .build();
    }

    public static Product toProduct(ProductDto productDto) {
        if (productDto == null) throw new RuntimeException("Article not found!!");

        Product product = new Product();
        product.setId(productDto.getId());
        product.setCodeProduit(productDto.getCodeProduit());
        product.setDesignation(productDto.getDesignation());
        product.setPrixUnitaireHt(productDto.getPrixUnitaireHt());
        product.setPrixUnitaireTtc(productDto.getPrixUnitaireTtc());
        product.setTauxTva(productDto.getTauxTva());
        product.setNumberSell(productDto.getNumberSell());
        product.setAvailable(productDto.isAvailable());
        product.setPromo(productDto.isPromo());
        product.setQuantity(productDto.getQuantity());
        product.setSelected(productDto.isSelected());
        product.setPhoto(productDto.getPhoto());
        product.setCategory(CategoryDto.toCategory(productDto.getCategory()));

        return product;
    }
}
