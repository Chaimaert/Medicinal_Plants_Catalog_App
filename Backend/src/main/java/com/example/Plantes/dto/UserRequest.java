package com.example.Plantes.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest{
    private String besoinDeSante;
    private List<String> preferences;      // Ex : types de plantes, formes, etc.
    private List<String> antecedentsMedicaux; // Ex : allergies, conditions médicales
}