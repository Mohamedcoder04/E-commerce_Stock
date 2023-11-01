package com.medbtissam.gestiondestock.controllers;

import com.medbtissam.gestiondestock.controllers.api.MvtStkApi;
import com.medbtissam.gestiondestock.dto.MvtStkDto;
import com.medbtissam.gestiondestock.services.MvtStkService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class MvtStkController implements MvtStkApi {

    private final MvtStkService mvtStkService;

    @Override
    public BigDecimal stockArticle(Integer id) {
        return mvtStkService.stockArticle(id);
    }

    @Override
    public List<MvtStkDto> listeMvtStkArticle(Integer idArticle) {
        return mvtStkService.listeMvtStkArticle(idArticle);
    }

    @Override
    public MvtStkDto entreeStock(MvtStkDto dto) {
        return mvtStkService.entreeStock(dto);
    }

    @Override
    public MvtStkDto sortieStock(MvtStkDto dto) {
        return mvtStkService.sortieStock(dto);
    }

    @Override
    public MvtStkDto correctionStockPositif(MvtStkDto dto) {
        return mvtStkService.correctionStockPositif(dto);
    }

    @Override
    public MvtStkDto correctionStockNegatif(MvtStkDto dto) {
        return mvtStkService.correctionStockNegatif(dto);
    }
}
