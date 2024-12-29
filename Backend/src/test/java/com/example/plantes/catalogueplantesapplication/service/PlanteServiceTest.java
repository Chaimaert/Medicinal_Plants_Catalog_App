package com.example.plantes.catalogueplantesapplication.service;

import com.example.plantes.catalogueplantesapplication.entities.Plante;
import com.example.plantes.catalogueplantesapplication.exceptions.PlanteNotFoundException;
import com.example.plantes.catalogueplantesapplication.repository.PlantRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PlanteServiceTest {

    @InjectMocks
    private PlanteService planteService;

    @Mock
    private PlantRepository plantRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetDetailsWhenPlanteExists() {
        // Arrange
        Long planteId = 1L;
        Plante mockPlante = new Plante();
        mockPlante.setId(planteId);
        mockPlante.setName("Mint");
        when(plantRepository.findById(planteId)).thenReturn(Optional.of(mockPlante));

        // Act
        Plante result = planteService.getDetails(planteId);

        // Assert
        assertNotNull(result);
        assertEquals("Mint", result.getName());
        verify(plantRepository, times(1)).findById(planteId);
    }

    @Test
    void testGetDetailsWhenPlanteDoesNotExist() {
        // Arrange
        Long planteId = 1L;
        when(plantRepository.findById(planteId)).thenReturn(Optional.empty());

        // Act & Assert
        PlanteNotFoundException exception = assertThrows(
                PlanteNotFoundException.class,
                () -> planteService.getDetails(planteId)
        );
        assertEquals("Plante non trouvée avec ID : " + planteId, exception.getMessage());
        verify(plantRepository, times(1)).findById(planteId);
    }

    @Test
    void testDeletePlanteWhenPlanteExists() {
        // Arrange
        Long planteId = 1L;
        when(plantRepository.existsById(planteId)).thenReturn(true);

        // Act
        assertDoesNotThrow(() -> planteService.deletePlante(planteId));

        // Assert
        verify(plantRepository, times(1)).deleteById(planteId);
    }

    @Test
    void testDeletePlanteWhenPlanteDoesNotExist() {
        // Arrange
        Long planteId = 1L;
        when(plantRepository.existsById(planteId)).thenReturn(false);

        // Act & Assert
        PlanteNotFoundException exception = assertThrows(
                PlanteNotFoundException.class,
                () -> planteService.deletePlante(planteId)
        );
        assertEquals("Plante non trouvée avec ID : " + planteId, exception.getMessage());
        verify(plantRepository, never()).deleteById(planteId);
    }
}
