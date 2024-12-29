package com.example.plantes.catalogueplantesapplication.repository;

import com.example.plantes.catalogueplantesapplication.entities.Plante;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlantRepository extends JpaRepository<Plante, Long> {

    List<Plante> findByUsesContaining(String besoinDeSante); // Pour les recommandations
    @Query("SELECT p FROM Plante p WHERE " +
            "(:nom IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :nom, '%'))) AND " +
            "(:proprietes IS NULL OR EXISTS (SELECT 1 FROM p.properties prop WHERE prop IN :proprietes)) AND " +
            "(:utilisations IS NULL OR EXISTS (SELECT 1 FROM p.uses use WHERE use IN :utilisations)) AND " +
            "(:region IS NULL OR EXISTS (SELECT 1 FROM p.region reg WHERE reg IN :region))")

    List<Plante> findByAllIgnoreCase(@Param("nom") String nom,
                                     @Param("proprietes") List<String> proprietes,
                                     @Param("utilisations") List<String> utilisations,
                                     @Param("region") String region);

    @EntityGraph(attributePaths = {"comments"})
    List<Plante> findAll();

}
