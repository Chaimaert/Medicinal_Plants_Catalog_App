package com.example.Plantes.Repository;


import com.example.Plantes.Entities.Commentaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentaireRepository extends JpaRepository<Commentaire, Long> {
    List<Commentaire> findByPlanteId(Long planteId); // Trouver les commentaires par ID de plante
}