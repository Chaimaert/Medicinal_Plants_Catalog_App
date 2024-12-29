package com.example.plantes.catalogueplantesapplication.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PlanteDTO {

    @SuppressWarnings("unused")
    private Long id;

    @SuppressWarnings("unused")
    private String name;

    @SuppressWarnings("unused")
    private String description;

    @SuppressWarnings("unused")
    private List<String> properties;

    @SuppressWarnings("unused")
    private List<String> uses;

    @SuppressWarnings("unused")
    private List<String> precautions;

    @SuppressWarnings("unused")
    private List<String> interactions;

    @SuppressWarnings("unused")
    private List<CommentaireDTO> comments;

    @SuppressWarnings("unused")
    private List<String> images;

    @SuppressWarnings("unused")
    private List<String> videos;

    @SuppressWarnings("unused")
    private List<String> articles;

    @SuppressWarnings("unused")
    private List<String> region;

    // Constructor for initializing all fields
    public PlanteDTO(Long id, String name, String description, List<String> properties,
                     List<String> uses, List<String> precautions, List<String> interactions,
                     List<CommentaireDTO> comments, List<String> images,
                     List<String> videos, List<String> articles, List<String> region) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.properties = properties;
        this.uses = uses;
        this.precautions = precautions;
        this.interactions = interactions;
        this.comments = comments;
        this.images = images;
        this.videos = videos;
        this.articles = articles;
        this.region = region;
    }
}
