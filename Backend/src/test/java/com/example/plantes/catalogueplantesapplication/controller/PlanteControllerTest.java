package com.example.plantes.catalogueplantesapplication.controller;

import com.example.plantes.catalogueplantesapplication.entities.Plante;
import com.example.plantes.catalogueplantesapplication.service.PlanteService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class PlanteControllerTest {

    private static final String PLANTE_A = "Plante A";
    private static final String DESCRIPTION_A = "Description A";

    @InjectMocks
    private PlanteController planteController;

    @Mock
    private PlanteService planteService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllPlantes() {
        // Arrange
        List<Plante> mockPlantes = List.of(
                Plante.builder()
                        .id(1L)
                        .name(PLANTE_A)
                        .description(DESCRIPTION_A)
                        .build(),
                Plante.builder()
                        .id(2L)
                        .name("Plante B")
                        .description("Description B")
                        .build()
        );

        when(planteService.getAllPlantes()).thenReturn(mockPlantes);

        // Act
        List<Plante> result = planteController.getAllPlantes();

        // Assert
        assertEquals(2, result.size());
        assertEquals(PLANTE_A, result.get(0).getName());
    }
}
