package com.example.Plantes.dto;

import jakarta.persistence.ElementCollection;
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
    private List<String> images;
    private List<String> videos;
    private List<String> articles;
    private List<String> region;
    public PlanteDTO(Long id, String name, String description, List<String> properties,
                     List<String> uses, List<String> precautions, List<String> interactions,
                     List<CommentaireDTO> comments,List<String> images,
                     List<String> videos,List<String> articles,List<String> region) {
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


