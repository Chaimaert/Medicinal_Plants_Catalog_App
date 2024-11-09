package com.example.Plantes.Service;

import com.example.Plantes.Entities.Commentaire;
import com.example.Plantes.Repository.CommentaireRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentaireService {

    @Autowired
    private CommentaireRepository commentaireRepository;

    // Obtenir les commentaires par ID de plante
    public List<Commentaire> getCommentairesByPlanteId(Long planteId) {
        return commentaireRepository.findByPlanteId(planteId);
    }

    // Ajouter un commentaire à une plante
    public void ajouterCommentaire(Commentaire commentaire) {
        commentaireRepository.save(commentaire);
    }


}