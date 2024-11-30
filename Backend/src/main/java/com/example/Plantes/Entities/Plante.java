package com.example.Plantes.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class Plante {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;

    // Nouveau constructeur pour initialiser uniquement l'ID
    public Plante(Long id) {
        this.id = id;
    }

    @ElementCollection // Pour les propriétés, les utilisations, etc.
    private List<String> properties;

    @ElementCollection
    private List<String> uses;

    @ElementCollection
    private List<String> precautions; // Précautions

    @ElementCollection
    private List<String> interactions; // Interactions

    @OneToMany(mappedBy = "plante") // Relation One-to-Many avec Commentaire
    @JsonManagedReference
    private List<Commentaire> comments;

    @ElementCollection
    private List<String> images;

    @ElementCollection
    private List<String> videos;

    @ElementCollection
    private List<String> articles;

    @ElementCollection
    private List<String> region;
}