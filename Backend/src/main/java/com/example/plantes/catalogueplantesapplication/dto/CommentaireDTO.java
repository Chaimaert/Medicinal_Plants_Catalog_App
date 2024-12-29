package com.example.plantes.catalogueplantesapplication.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentaireDTO {

    @SuppressWarnings("unused")
    private Long id;

    @SuppressWarnings("unused")
    private String nom;

    @SuppressWarnings("unused")
    private String contenu;

    // Constructor for initializing fields
    @SuppressWarnings("unused")
    public CommentaireDTO(Long id, String nom, String contenu) {
        this.id = id;
        this.nom = nom;
        this.contenu = contenu;
    }
}
