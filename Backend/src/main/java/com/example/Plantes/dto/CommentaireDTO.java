package com.example.Plantes.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentaireDTO {
    private Long id;
    private String nom;
    private String contenu;

    // Constructeur pour initialiser les champs
    public CommentaireDTO(Long id, String nom, String contenu) {
        this.id = id;
        this.nom = nom;
        this.contenu = contenu;
    }
}