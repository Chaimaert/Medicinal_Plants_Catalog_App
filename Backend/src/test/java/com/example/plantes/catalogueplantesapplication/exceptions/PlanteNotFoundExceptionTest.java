package com.example.plantes.catalogueplantesapplication.exceptions;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class PlanteNotFoundExceptionTest {

    @Test
    void testExceptionMessage() {
        String message = "Plante non trouvée avec ID : 1";
        PlanteNotFoundException exception = new PlanteNotFoundException(message);

        assertEquals(message, exception.getMessage());
    }
}
