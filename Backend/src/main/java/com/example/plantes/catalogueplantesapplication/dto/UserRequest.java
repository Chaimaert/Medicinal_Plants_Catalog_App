package com.example.plantes.catalogueplantesapplication.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest{

    @SuppressWarnings("unused")
    private String besoinDeSante;

    @SuppressWarnings("unused")
    private List<String> preferences;

    @SuppressWarnings("unused")
    private List<String> antecedentsMedicaux;

}