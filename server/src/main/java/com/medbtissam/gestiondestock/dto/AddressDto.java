package com.medbtissam.gestiondestock.dto;

import com.medbtissam.gestiondestock.model.Address;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embeddable;

@Getter
@Setter
@AllArgsConstructor
@Builder
@Embeddable
public class AddressDto {

    private Integer id;

    private String street;

    private Integer houseNumber;

    private Integer zipCode;

    private String city;

    private String country;


    public static AddressDto fromEntity(Address adress){
        return AddressDto.builder()
                .street(adress.getStreet())
                .houseNumber(adress.getHouseNumber())
                .zipCode(adress.getZipCode())
                .city(adress.getCity())
                .country(adress.getCountry())
                .build();
    }

    public static Address toEntity(AddressDto dto){
        return Address.builder()
                .street(dto.getStreet())
                .houseNumber(dto.getHouseNumber())
                .zipCode(dto.getZipCode())
                .city(dto.getCity())
                .country(dto.getCountry())
                .build();
    }
}
