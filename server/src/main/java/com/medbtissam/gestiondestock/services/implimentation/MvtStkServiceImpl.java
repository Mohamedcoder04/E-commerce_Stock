package com.medbtissam.gestiondestock.services.implimentation;

import com.medbtissam.gestiondestock.dto.MvtStkDto;
import com.medbtissam.gestiondestock.repositories.exceptions.ErrorCodes;
import com.medbtissam.gestiondestock.repositories.exceptions.InvalidEntityException;
import com.medbtissam.gestiondestock.model.TypeMvt;
import com.medbtissam.gestiondestock.repositories.MvtStkRepository;
import com.medbtissam.gestiondestock.services.ProductService;
import com.medbtissam.gestiondestock.services.MvtStkService;
import com.medbtissam.gestiondestock.validator.MvtStkValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class MvtStkServiceImpl implements MvtStkService {
    private MvtStkRepository mvtStkRepository;
    private ProductService productService;

    @Autowired
    public MvtStkServiceImpl(MvtStkRepository mvtStkRepository, ProductService productService) {
        this.mvtStkRepository = mvtStkRepository;
        this.productService = productService;
    }

    @Override
    public BigDecimal stockArticle(Integer idArticle) {
        productService.findById(idArticle);
        return mvtStkRepository.stockReelArticle(idArticle);
    }

    @Override
    public List<MvtStkDto> listeMvtStkArticle(Integer idArticle) {
        productService.findById(idArticle);
        return mvtStkRepository.findAllByProductId(idArticle).stream()
                .map(MvtStkDto::fromMvtStk)
                .collect(Collectors.toList());
    }

    @Override
    public MvtStkDto entreeStock(MvtStkDto dto) {
        return entreePositive(dto, TypeMvt.ENTREE);
    }

    @Override
    public MvtStkDto sortieStock(MvtStkDto dto) {
        return sortieNegative(dto, TypeMvt.SORTIE);
    }

    @Override
    public MvtStkDto correctionStockPositif(MvtStkDto dto) {
        return entreePositive(dto, TypeMvt.CORRECTION_POS);
    }

    @Override
    public MvtStkDto correctionStockNegatif(MvtStkDto dto) {
        return sortieNegative(dto, TypeMvt.CORRECTION_NEG);
    }

    private MvtStkDto entreePositive(MvtStkDto dto, TypeMvt typeMvt) {
        List<String> errors = MvtStkValidator.validate(dto);
        if (!errors.isEmpty()) {
            log.error("mouvement stock n'est pas valid {}", dto);
            throw new InvalidEntityException("", ErrorCodes.MVTSTK_NOT_VALID, errors);
        }
        dto.setTypeMvt(typeMvt);
        dto.setQuantite(BigDecimal.valueOf(
                Math.abs(
                        dto.getQuantite().doubleValue()
                )
        ));
        dto.setDateMvt(Instant.now());
        return MvtStkDto.fromMvtStk(
                mvtStkRepository.save(MvtStkDto.toMvtStk(
                        dto
                ))
        );

    }

    private MvtStkDto sortieNegative(MvtStkDto dto, TypeMvt typeMvt) {
        List<String> errors = MvtStkValidator.validate(dto);
        if (!errors.isEmpty()) {
            log.error("mouvement stock n'est pas valid {}", dto);
            throw new InvalidEntityException("", ErrorCodes.MVTSTK_NOT_VALID, errors);
        }
        dto.setTypeMvt(typeMvt);
        dto.setQuantite(BigDecimal.valueOf(
                Math.abs(
                        dto.getQuantite().doubleValue()
                ) * -1
        ));
        dto.setDateMvt(Instant.now());
        return MvtStkDto.fromMvtStk(
                mvtStkRepository.save(MvtStkDto.toMvtStk(
                        dto
                ))
        );

    }
}
