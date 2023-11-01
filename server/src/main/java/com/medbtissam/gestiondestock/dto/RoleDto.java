package com.medbtissam.gestiondestock.dto;

import com.medbtissam.gestiondestock.model.Role;
import lombok.Builder;
import lombok.Data;

@Data @Builder
public class RoleDto {
    private Integer id;
    private String roleName;
    private UtilisateurDto utilisateur;

    public static RoleDto fromRole(Role role){
        if(role == null ) throw new RuntimeException("Role not found!!!");

        return RoleDto.builder()
                .id(role.getId())
                .roleName(role.getRoleName())
                .build();
    }

    public static Role toRole(RoleDto roleDto){
        if(roleDto == null ) throw new RuntimeException("Role not found!!!");

        Role role = new Role();
        role.setId(roleDto.getId());
        role.setRoleName(roleDto.getRoleName());

        return role;
    }
}
