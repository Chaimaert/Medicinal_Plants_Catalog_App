package com.example.Plantes.Entities;

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
    private Long id; // Identifiant unique du commentaire

    private String nom; // Nom de l'utilisateur qui a laissé le commentaire
    private String email; // Email de l'utilisateur (optionnel)
    private String contenu; // Contenu du commentaire

    @ManyToOne // Relation Many-to-One avec Plante
    @JoinColumn(name = "plante_id") // Clé étrangère vers la table Plante
    private Plante plante; // La plante associée à ce commentaire
}