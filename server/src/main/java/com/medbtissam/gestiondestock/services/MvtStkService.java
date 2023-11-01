package com.medbtissam.gestiondestock.services;

import com.medbtissam.gestiondestock.dto.MvtStkDto;

import java.math.BigDecimal;
import java.util.List;

public interface MvtStkService {
    BigDecimal stockArticle(Integer id);
    List<MvtStkDto> listeMvtStkArticle(Integer idArticle);
    MvtStkDto entreeStock(MvtStkDto dto);
    MvtStkDto sortieStock(MvtStkDto dto);
    MvtStkDto correctionStockPositif(MvtStkDto dto);
    MvtStkDto correctionStockNegatif(MvtStkDto dto);
}
