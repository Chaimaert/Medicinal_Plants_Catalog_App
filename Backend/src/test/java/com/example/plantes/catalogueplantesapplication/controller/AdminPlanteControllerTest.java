package com.example.plantes.catalogueplantesapplication.controller;

import com.example.plantes.catalogueplantesapplication.entities.Plante;
import com.example.plantes.catalogueplantesapplication.service.PlanteService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AdminPlanteControllerTest {

    private AdminPlanteController adminPlanteController;

    @Mock
    private PlanteService planteService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        adminPlanteController = new AdminPlanteController(planteService);
    }

    @Test
    void testGetAllPlantes() {
        when(planteService.getAllPlantes()).thenReturn(List.of(new Plante(1L), new Plante(2L)));

        ResponseEntity<List<Plante>> response = adminPlanteController.getAllPlantes();

        assertNotNull(response);
        assertEquals(2, response.getBody().size());
        verify(planteService, times(1)).getAllPlantes();
    }

    @Test
    void testAddPlante() {
        Plante newPlante = new Plante();
        when(planteService.addPlante(newPlante)).thenReturn(newPlante);

        ResponseEntity<Plante> response = adminPlanteController.addPlante(newPlante);

        assertNotNull(response);
        assertEquals(newPlante, response.getBody());
        verify(planteService, times(1)).addPlante(newPlante);
    }

    @Test
    void testUpdatePlante() {
        Plante updatedPlante = new Plante();
        when(planteService.updatePlante(1L, updatedPlante)).thenReturn(updatedPlante);

        ResponseEntity<Plante> response = adminPlanteController.updatePlante(1L, updatedPlante);

        assertNotNull(response);
        assertEquals(updatedPlante, response.getBody());
        verify(planteService, times(1)).updatePlante(1L, updatedPlante);
    }

    @Test
    void testDeletePlante() {
        doNothing().when(planteService).deletePlante(1L);

        ResponseEntity<Void> response = adminPlanteController.deletePlante(1L);

        assertNotNull(response);
        assertEquals(204, response.getStatusCodeValue());
        verify(planteService, times(1)).deletePlante(1L);
    }
}
