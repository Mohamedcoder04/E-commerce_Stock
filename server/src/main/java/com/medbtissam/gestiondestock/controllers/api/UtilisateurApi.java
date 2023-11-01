package com.medbtissam.gestiondestock.controllers.api;

import com.medbtissam.gestiondestock.dto.ChangePasswordUtilisatuerDto;
import com.medbtissam.gestiondestock.dto.UtilisateurDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/utilisateurs")
@Tag(name = "utilisateur")
public interface UtilisateurApi {
    @PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    UtilisateurDto save(@RequestBody UtilisateurDto utilisateurDto);

    @GetMapping(value = "/utilisateur/{idUtilisateur}", produces = MediaType.APPLICATION_JSON_VALUE)
    UtilisateurDto findById(@PathVariable("idUtilisateur") Integer id);

   /* @GetMapping(value = ROUTE_UTILISATEUR+"/utilisateur/{email}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ApiOperation(value = "",notes = "", response = UtilisateurDto.class)
    UtilisateurDto findByEmail( String email); */

    @GetMapping(value = "/all/{role}", produces = MediaType.APPLICATION_JSON_VALUE)
    List<UtilisateurDto> findAll(@PathVariable("role")String role);

    @DeleteMapping(value = "/delete/{idUtilisateur}")
    void delete( Integer id);

    @PostMapping(value = "/changemotdepasse/{id}")
    UtilisateurDto updatePassword(
            @RequestBody ChangePasswordUtilisatuerDto dto,
            @PathVariable("id") Integer id
    );

    @GetMapping("/count-users")
    Integer getNumberUtilisateursByCommandeClients();

}
