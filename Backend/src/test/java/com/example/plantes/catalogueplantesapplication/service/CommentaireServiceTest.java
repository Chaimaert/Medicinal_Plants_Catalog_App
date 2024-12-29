package com.example.plantes.catalogueplantesapplication.service;

import com.example.plantes.catalogueplantesapplication.entities.Commentaire;
import com.example.plantes.catalogueplantesapplication.repository.CommentaireRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class CommentaireServiceTest {

    @InjectMocks
    private CommentaireService commentaireService;

    @Mock
    private CommentaireRepository commentaireRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetCommentairesByPlanteId() {
        // Arrange
        Long planteId = 1L;
        List<Commentaire> mockCommentaires = List.of(
                new Commentaire(1L, "Nom 1", null, "Contenu 1", null),
                new Commentaire(2L, "Nom 2", null, "Contenu 2", null)
        );
        when(commentaireRepository.findByPlanteId(planteId)).thenReturn(mockCommentaires);

        // Act
        List<Commentaire> result = commentaireService.getCommentairesByPlanteId(planteId);

        // Assert
        assertEquals(2, result.size());
        assertEquals("Nom 1", result.get(0).getNom());
        verify(commentaireRepository, times(1)).findByPlanteId(planteId);
    }

    @Test
    void testAjouterCommentaire() {
        // Arrange
        Commentaire commentaire = new Commentaire(1L, "Nom", null, "Contenu", null);

        // Act
        commentaireService.ajouterCommentaire(commentaire);

        // Assert
        verify(commentaireRepository, times(1)).save(commentaire);
    }
}
