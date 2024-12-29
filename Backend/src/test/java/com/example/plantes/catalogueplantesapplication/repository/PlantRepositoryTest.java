package com.example.plantes.catalogueplantesapplication.repository;

import com.example.plantes.catalogueplantesapplication.entities.Plante;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class PlantRepositoryTest {

    @Autowired
    private PlantRepository plantRepository;

    @Test
    void testFindByAllIgnoreCase() {
        Plante plante = new Plante();
        plante.setName("Mint");
        plantRepository.save(plante);

        List<Plante> results = plantRepository.findByAllIgnoreCase("Mint", null, null, null);
        assertEquals(1, results.size());
    }
}
