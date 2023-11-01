package com.medbtissam.gestiondestock.controllers.api;

import com.medbtissam.gestiondestock.dto.MvtStkDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@Tag(name = "mvtStk")
@RequestMapping("/mvtstk")
public interface MvtStkApi {

    @GetMapping(value = "/stockArticle/{idArticle}")
    BigDecimal stockArticle(@PathVariable("idArticle") Integer id);

    @GetMapping(value = "/listeMvtStck/article/{idArticle}", produces = MediaType.APPLICATION_JSON_VALUE)
    List<MvtStkDto> listeMvtStkArticle(@PathVariable("idArticle") Integer idArticle);

    @PostMapping(value = "/entreeStock")
    MvtStkDto entreeStock(@RequestBody MvtStkDto dto);

    @PostMapping(value = "/sortieStock")
    MvtStkDto sortieStock(@RequestBody MvtStkDto dto);

    @PostMapping(value = "/correctionStockPositif" , consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    MvtStkDto correctionStockPositif(@RequestBody MvtStkDto dto);

    @PostMapping(value = "/correctionStockNegatif")
    MvtStkDto correctionStockNegatif(@RequestBody MvtStkDto dto);
}
