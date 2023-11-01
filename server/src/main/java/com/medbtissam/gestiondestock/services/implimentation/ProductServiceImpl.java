package com.medbtissam.gestiondestock.services.implimentation;

import com.medbtissam.gestiondestock.dto.LigneCommandeClientDto;
import com.medbtissam.gestiondestock.dto.LigneCommandeFournisseurDto;
import com.medbtissam.gestiondestock.dto.LigneVenteDto;
import com.medbtissam.gestiondestock.dto.ProductDto;
import com.medbtissam.gestiondestock.model.LigneCommandeClient;
import com.medbtissam.gestiondestock.model.LigneCommandeFournisseur;
import com.medbtissam.gestiondestock.model.LigneVente;
import com.medbtissam.gestiondestock.model.Product;
import com.medbtissam.gestiondestock.repositories.LigneCommandeClientRepository;
import com.medbtissam.gestiondestock.repositories.LigneCommandeFournisseurRepository;
import com.medbtissam.gestiondestock.repositories.LigneVenteRepository;
import com.medbtissam.gestiondestock.repositories.ProductRepository;
import com.medbtissam.gestiondestock.repositories.exceptions.EntityNotFoundException;
import com.medbtissam.gestiondestock.repositories.exceptions.ErrorCodes;
import com.medbtissam.gestiondestock.repositories.exceptions.InvalidEntityException;
import com.medbtissam.gestiondestock.repositories.exceptions.InvalidOperationException;
import com.medbtissam.gestiondestock.services.ProductService;
import com.medbtissam.gestiondestock.validator.ArticleValidator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ProductServiceImpl implements ProductService {
    private ProductRepository productRepository;
    private LigneCommandeClientRepository ligneCommandeClientRepository;
    private LigneVenteRepository ligneVenteRepository;
    private LigneCommandeFournisseurRepository ligneCommandeFournisseurRepository;

    public ProductServiceImpl(ProductRepository productRepository, LigneCommandeClientRepository ligneCommandeClientRepository, LigneVenteRepository ligneVenteRepository, LigneCommandeFournisseurRepository ligneCommandeFournisseurRepository) {
        this.productRepository = productRepository;
        this.ligneCommandeClientRepository = ligneCommandeClientRepository;
        this.ligneVenteRepository = ligneVenteRepository;
        this.ligneCommandeFournisseurRepository = ligneCommandeFournisseurRepository;
    }

    @Override
    public ProductDto save(ProductDto productDto) {
        List<String> erros = ArticleValidator.validate(productDto);
        if (!erros.isEmpty()) {
            log.error("Article not valid {}", productDto);
            throw new InvalidEntityException("L'article n'est pas valide", ErrorCodes.ARTICLE_NOT_VALID, erros);
        }
        if(productDto.getNumberSell() == null) {
            productDto.setNumberSell(0);
        }
        // Article articleSave = articleRepository.save(ArticleDto.toArticle(articleDto));

        return ProductDto.fromProduct(productRepository.save(ProductDto.toProduct(productDto))
        );
    }

    @Override
    public ProductDto findById(Integer id) {
        // la méthode de el yousfi ou bien

        if (id == null) {
            log.error("Article Id is null");
            return null;
        }
        Product product = productRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException("aucun Article a l'Id " + id, ErrorCodes.ARTICLE_NOT_FOUND));
        ProductDto productDto = ProductDto.fromProduct(product);

        return productDto;
    }

    @Override
    public ProductDto findByCodeArticle(String codeArticle) {
        if (!StringUtils.hasLength(codeArticle)) {
            log.error("codeArticle is null");
            return null;
        }
        Optional<Product> article = productRepository.findProductByCodeProduit(codeArticle);
        ProductDto productDto = ProductDto.fromProduct(article.get());

        return Optional.of(productDto).orElseThrow(() -> new EntityNotFoundException("aucun Article a ce code " + codeArticle, ErrorCodes.ARTICLE_NOT_FOUND));
    }

    @Override
    public List<ProductDto> findAll() {
        return productRepository.findAllByOrderByIdDesc().stream()
                .map(ProductDto::fromProduct)
                .collect(Collectors.toList());
    }

    @Override
    public void addProducts(List<ProductDto> productDtoList) {
        productDtoList.forEach(this::save);
    }

    @Override
    public void delete(Integer id) {
        if (id == null) {
            log.error("Article Id is null");
        }
        List<LigneCommandeClient> ligneCommandeClients = ligneCommandeClientRepository.findAllByProductId(id);
        if (!ligneCommandeClients.isEmpty()) {
            throw new InvalidOperationException("Impossible de supprimer un article déja utilisé dans des commande Client", ErrorCodes.ARTICLE_ALREADY_USE);
        }

        List<LigneCommandeFournisseur> ligneCommandeFournisseurs = ligneCommandeFournisseurRepository.findAllByProductId(id);
        if (!ligneCommandeFournisseurs.isEmpty()) {
            throw new InvalidOperationException("Impossible de supprimer un article déja utilisé dans des commande fournisseur", ErrorCodes.ARTICLE_ALREADY_USE);
        }

        List<LigneVente> ligneVentes = ligneVenteRepository.findAllByProductId(id);
        if (!ligneVentes.isEmpty()) {
            throw new InvalidOperationException("Impossible de supprimer un article déja utilisé dans des vente", ErrorCodes.ARTICLE_ALREADY_USE);
        }
        productRepository.deleteById(id);
    }


    @Override
    public List<LigneCommandeClientDto> findHistoriqueCommandeClient(Integer idArticle) {
        checkIdArticle(idArticle);
        return ligneCommandeClientRepository.findAllByCommandeClientId(idArticle)
                .stream()
                .map(LigneCommandeClientDto::fromLigneCommandeClient)
                .collect(Collectors.toList());
    }

    @Override
    public List<LigneVenteDto> findHistoriqueVentes(Integer idArticle) {
        checkIdArticle(idArticle);
        List<LigneVente> ligneVentes = ligneVenteRepository.findAllByProductId(idArticle);

        return ligneVentes.stream()
                .map(LigneVenteDto::fromLigneVente)
                .collect(Collectors.toList());
    }

    @Override
    public List<LigneCommandeFournisseurDto> findHistoriqueCommandeFournisseur(Integer idArticle) {
        checkIdArticle(idArticle);
        return ligneCommandeFournisseurRepository.findAllByProductId(idArticle)
                .stream()
                .map(LigneCommandeFournisseurDto::fromLigneCommandeFournisseur)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDto> findAllArticleByCategory(Integer idCategory) {
        checkIdCategory(idCategory);

        return productRepository.findAllByCategoryId(idCategory)
                .stream()
                .map(ProductDto::fromProduct)
                .collect(Collectors.toList());
    }

    private void checkIdArticle(Integer id) {
        if (id == null) {
            throw new EntityNotFoundException("aucun article avec l'ID" + id + " n'a été trouvé", ErrorCodes.ARTICLE_NOT_FOUND);
        }
    }

    private void checkIdCategory(Integer id) {
        if (id == null) {
            throw new EntityNotFoundException("aucun article avec l'ID" + id + " n'a été trouvé", ErrorCodes.CATEGORY_NOT_FOUND);
        }
    }

    @Override
    public List<ProductDto> getAll(BigDecimal minPrice, BigDecimal maxPrice) {

        return productRepository.findAllByPrixUnitaireHt(minPrice, maxPrice)
                .stream()
                .map(ProductDto::fromProduct)
                .collect(Collectors.toList());
    }


    @Override
    public List<ProductDto> getMostSelling() {

        return productRepository.findTop8ByOrderByNumberSellDesc()
                .stream()
                .map(ProductDto::fromProduct)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDto> getInterested() {
        return productRepository.findTop8ByOrderByCreationDate()
                .stream()
                .map(ProductDto::fromProduct)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDto> searchProductDisplay(String keyword) {
        List<Product> products = productRepository.findAllByCodeProduitContainingIgnoreCase(keyword);
        return products
                .stream()
                .map(ProductDto::fromProduct)
                .collect(Collectors.toList());
    }


}
