package com.example.plantes.catalogueplantesapplication.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class Commentaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @SuppressWarnings("unused")
    private Long id;

    @SuppressWarnings("unused")
    private String nom;

    @SuppressWarnings("unused")
    private String email; // Optional

    @SuppressWarnings("unused")
    private String contenu;

    @ManyToOne
    @JoinColumn(name = "plante_id")
    @JsonBackReference
    private Plante plante;

    // Custom constructor for testing (without email)
    public Commentaire(Long id, String nom, String contenu, Plante plante) {
        this.id = id;
        this.nom = nom;
        this.contenu = contenu;
        this.plante = plante;
    }
}
