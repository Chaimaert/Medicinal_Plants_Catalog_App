package com.example.plantes.catalogueplantesapplication.controller;

import com.example.plantes.catalogueplantesapplication.dto.UserRequest;
import com.example.plantes.catalogueplantesapplication.entities.Plante;
import com.example.plantes.catalogueplantesapplication.service.RecommandationService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.hamcrest.Matchers.*;

class RecommandationControllerTest {

    private MockMvc mockMvc;

    @Mock
    private RecommandationService recommandationService;

    @InjectMocks
    private RecommandationController recommandationController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(recommandationController).build();
    }

    @Test
    void testObtenirRecommandations() throws Exception {
        // Arrange
        UserRequest request = new UserRequest();
        request.setBesoinDeSante("Skin care");

        List<Plante> mockRecommandations = List.of(
                Plante.builder()
                        .id(1L)
                        .name("Chamomile")
                        .description("Description A")
                        .properties(List.of("Soothing"))
                        .uses(List.of("Tea"))
                        .precautions(List.of("None"))
                        .build(),
                Plante.builder()
                        .id(2L)
                        .name("Aloe Vera")
                        .description("Description B")
                        .properties(List.of("Hydrating"))
                        .uses(List.of("Gel"))
                        .precautions(List.of("None"))
                        .build()
        );

        when(recommandationService.genererRecommandations(request)).thenReturn(mockRecommandations);

        // Act & Assert
        mockMvc.perform(post("/plantes/recommandations")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                    {
                        "besoinDeSante": "Skin care",
                        "preferences": [],
                        "antecedentsMedicaux": []
                    }
                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()", is(2)))
                .andExpect(jsonPath("$[0].name", is("Chamomile")))
                .andExpect(jsonPath("$[0].description", is("Description A")))
                .andExpect(jsonPath("$[1].name", is("Aloe Vera")))
                .andExpect(jsonPath("$[1].description", is("Description B")));
    }
}
