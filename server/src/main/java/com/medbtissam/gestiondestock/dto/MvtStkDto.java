package com.medbtissam.gestiondestock.dto;

import com.medbtissam.gestiondestock.model.MvtStk;
import com.medbtissam.gestiondestock.model.SourceMvtStk;
import com.medbtissam.gestiondestock.model.TypeMvt;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;

@Data @Builder
public class MvtStkDto {
    private Integer id;
    private Instant dateMvt;
    private BigDecimal quantite;
    private ProductDto productDto;
    private SourceMvtStk sourceMvtStk;
    private TypeMvt typeMvt;

    public static MvtStkDto fromMvtStk(MvtStk mvtStk){
        if(mvtStk == null ) throw new RuntimeException("MvtStk not found!!!");

        return MvtStkDto.builder()
                .id(mvtStk.getId())
                .dateMvt(mvtStk.getDateMvt())
                .quantite(mvtStk.getQuantite())
                .productDto(ProductDto.fromProduct(mvtStk.getProduct()))
                .typeMvt(mvtStk.getTypeMvt())
                .sourceMvtStk(mvtStk.getSourceMvtStk())
                .build();
    }

    public static  MvtStk toMvtStk(MvtStkDto mvtStkDto){
        if(mvtStkDto == null ) throw new RuntimeException("MvtStk not found!!!");

        MvtStk mvtStk = new MvtStk();
        mvtStk.setId(mvtStkDto.getId());
        mvtStk.setDateMvt(mvtStkDto.getDateMvt());
        mvtStk.setQuantite(mvtStkDto.getQuantite());
        mvtStk.setProduct(ProductDto.toProduct(mvtStkDto.getProductDto()));
        mvtStk.setTypeMvt(mvtStkDto.getTypeMvt());
        mvtStk.setSourceMvtStk(mvtStkDto.getSourceMvtStk());
        return mvtStk;
    }
}
