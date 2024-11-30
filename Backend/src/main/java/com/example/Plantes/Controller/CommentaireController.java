package com.example.Plantes.Controller;

import com.example.Plantes.Entities.Commentaire;
import com.example.Plantes.Entities.Plante;
import com.example.Plantes.Service.CommentaireService;
import com.example.Plantes.dto.CommentaireDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/plantes")
public class CommentaireController {

    @Autowired
    private CommentaireService commentaireService;

    // Obtenir les commentaires d'une plante spécifique
    @GetMapping("/{planteId}/commentaires")
    public List<CommentaireDTO> getCommentaires(@PathVariable Long planteId) {
        List<Commentaire> commentaires = commentaireService.getCommentairesByPlanteId(planteId);
        return commentaires.stream()
                .map(commentaire -> new CommentaireDTO(commentaire.getId(), commentaire.getNom(), commentaire.getContenu()))
                .collect(Collectors.toList());
    }

    // Ajouter un commentaire à une plante
    @PostMapping("/{planteId}/commentaires")
    public void ajouterCommentaire(@PathVariable Long planteId, @RequestBody Commentaire commentaire) {
        commentaire.setPlante(new Plante(planteId)); // Associe le commentaire à la plante
        commentaireService.ajouterCommentaire(commentaire);
    }
}
