package com.medbtissam.gestiondestock.repositories;

import com.medbtissam.gestiondestock.model.LigneCommandeClient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LigneCommandeClientRepository extends JpaRepository<LigneCommandeClient, Integer> {

    @Query("SELECT lc FROM LigneCommandeClient lc " +
            "INNER JOIN lc.product p " +
            "INNER JOIN p.category c " +
            "WHERE c.id = :idCat")
    List<LigneCommandeClient> findAllByCategoryId(Integer idCat);
    List<LigneCommandeClient> findAllByCommandeClientId(Integer idCommandeClient);
    List<LigneCommandeClient> findAllByProductId(Integer idArticle);


    @Query("SELECT MONTH(lc.creationDate) AS month, COUNT(lc) AS salesCount " +
            "FROM LigneCommandeClient lc " +
            "WHERE lc.product.category.id = :id AND YEAR(lc.creationDate) = YEAR(CURRENT_DATE) " +
            "GROUP BY MONTH(lc.creationDate)")
    List<Object[]> countSalesPerMonth(Integer id);


}
