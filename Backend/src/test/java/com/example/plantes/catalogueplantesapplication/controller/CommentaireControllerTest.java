package com.example.plantes.catalogueplantesapplication.controller;

import com.example.plantes.catalogueplantesapplication.dto.CommentaireDTO;
import com.example.plantes.catalogueplantesapplication.entities.Commentaire;
import com.example.plantes.catalogueplantesapplication.service.CommentaireService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class CommentaireControllerTest {

    @InjectMocks
    private CommentaireController commentaireController;

    @Mock
    private CommentaireService commentaireService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetCommentaires() {
        // Arrange
        Long planteId = 1L;
        List<Commentaire> mockCommentaires = List.of(
                new Commentaire(1L, "Nom 1", "Contenu 1", null),
                new Commentaire(2L, "Nom 2", "Contenu 2", null)
        );
        when(commentaireService.getCommentairesByPlanteId(planteId)).thenReturn(mockCommentaires);

        // Act
        List<CommentaireDTO> result = commentaireController.getCommentaires(planteId);

        // Assert
        assertEquals(2, result.size());
        assertEquals("Nom 1", result.get(0).getNom());
        verify(commentaireService, times(1)).getCommentairesByPlanteId(planteId);
    }

    @Test
    void testAjouterCommentaire() {
        // Arrange
        Long planteId = 1L;
        Commentaire commentaire = new Commentaire(1L, "Nom", "Contenu", null);

        // Act
        commentaireController.ajouterCommentaire(planteId, commentaire);

        // Assert
        verify(commentaireService, times(1)).ajouterCommentaire(commentaire);
        assertEquals(planteId, commentaire.getPlante().getId());
    }
}
