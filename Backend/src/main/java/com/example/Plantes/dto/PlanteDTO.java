package com.example.Plantes.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PlanteDTO {
    private Long id;
    private String name;
    private String description;
    private List<String> properties;
    private List<String> uses;
    private List<String> precautions;
    private List<String> interactions;
    private List<CommentaireDTO> comments;

    public PlanteDTO(Long id, String name, String description, List<String> properties, List<String> uses, List<String> precautions, List<String> interactions, List<CommentaireDTO> comments) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.properties = properties;
        this.uses = uses;
        this.precautions = precautions;
        this.interactions = interactions;
        this.comments = comments;
    }
}


