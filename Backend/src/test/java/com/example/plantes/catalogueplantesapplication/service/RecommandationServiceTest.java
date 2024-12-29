package com.example.plantes.catalogueplantesapplication.service;

import com.example.plantes.catalogueplantesapplication.entities.Plante;
import com.example.plantes.catalogueplantesapplication.dto.UserRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class RecommandationServiceTest {

    @InjectMocks
    private RecommandationService recommandationService;

    @Mock
    private PlanteService planteService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGenererRecommandations() {
        // Arrange
        UserRequest mockRequest = new UserRequest(
                "Skin care",
                List.of("Soothing", "Hydration"),
                List.of("Allergy")
        );

        List<Plante> mockRecommandations = List.of(
                Plante.builder()
                        .id(1L)
                        .name("Chamomile")
                        .description("Description A")
                        .properties(List.of("Soothing"))
                        .uses(List.of("Tea"))
                        .precautions(List.of("Allergy"))
                        .build(),
                Plante.builder()
                        .id(2L)
                        .name("Aloe Vera")
                        .description("Description B")
                        .properties(List.of("Hydration"))
                        .uses(List.of("Skincare"))
                        .precautions(List.of())
                        .build()
        );

        when(planteService.genererRecommandations("Skin care")).thenReturn(mockRecommandations);

        // Act
        List<Plante> result = recommandationService.genererRecommandations(mockRequest);

        // Assert
        assertEquals(2, result.size());
        assertEquals("Chamomile", result.get(0).getName());
        assertEquals("Aloe Vera", result.get(1).getName());
    }
}
