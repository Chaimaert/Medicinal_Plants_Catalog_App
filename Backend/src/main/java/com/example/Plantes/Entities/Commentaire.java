package com.example.Plantes.Entities;

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
    private Long id;

    private String nom;
    private String email; // Email de l'utilisateur (optionnel)
    private String contenu;

    @ManyToOne // Relation Many-to-One avec Plante
    @JoinColumn(name = "plante_id")
    @JsonBackReference
    private Plante plante; // La plante associée à ce commentaire
}