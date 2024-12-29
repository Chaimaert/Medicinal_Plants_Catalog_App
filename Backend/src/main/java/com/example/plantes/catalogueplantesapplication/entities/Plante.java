package com.example.plantes.catalogueplantesapplication.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.Collections;
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

    @SuppressWarnings("unused")
    private String name;

    @SuppressWarnings("unused")
    private String description;

    @ElementCollection
    @Builder.Default
    private List<String> properties = Collections.emptyList();

    @ElementCollection
    @Builder.Default
    private List<String> uses = Collections.emptyList();

    @ElementCollection
    @Builder.Default
    private List<String> precautions = Collections.emptyList();

    @ElementCollection
    @Builder.Default
    private List<String> interactions = Collections.emptyList();

    @OneToMany(mappedBy = "plante")
    @JsonManagedReference
    @Builder.Default
    private List<Commentaire> comments = Collections.emptyList();

    @ElementCollection
    @Builder.Default
    private List<String> images = Collections.emptyList();

    @ElementCollection
    @Builder.Default
    private List<String> videos = Collections.emptyList();

    @ElementCollection
    @Builder.Default
    private List<String> articles = Collections.emptyList();

    @ElementCollection
    @Builder.Default
    private List<String> region = Collections.emptyList();

    public Plante(Long id) {
        this.id = id;
    }
}
