package com.medbtissam.gestiondestock.interceptor;

import org.hibernate.EmptyInterceptor;
import org.slf4j.MDC;
import org.springframework.util.StringUtils;

public class Interceptor extends EmptyInterceptor {


    @Override
    public String onPrepareStatement(String sql) {
        if (StringUtils.hasLength(sql) && sql.toLowerCase().startsWith("select")) {
            // select utilisateu0_. exemple d'une requéte
            final String entityName /*utilisateu0_*/ = sql.substring(7 /* select avec espace */, sql.indexOf(".")/* substring de la position 7 jusqu'à lorsqu'il trouve . */); // je vais extraire le nom de l'entitie à partir de la requétte select
            final String idEntreprise = MDC.get("idEntreprise");

            if(StringUtils.hasLength(entityName)
                // les deux lignes pour les entities entreprises et les rôles qui n'ont pas contient idEntreprise
                && !entityName.toLowerCase().contains("entreprise")
                && !entityName.toLowerCase().contains("role")

                && StringUtils.hasLength(idEntreprise)
            ){
                if (sql.contains("where")) {
                    sql = sql + " and " + entityName + ".identreprise = " + idEntreprise;
                } else {
                    sql = sql + " where " + entityName + ".identreprise = " + idEntreprise;
                }
            }
        }
        return super.onPrepareStatement(sql);
    }

}
