package com.example.Plantes.Controller;

import com.example.Plantes.Entities.Plante;
import com.example.Plantes.Service.PlanteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin/plantes")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminPlanteController {

    private final PlanteService planteService;

    public AdminPlanteController(PlanteService planteService) {
        this.planteService = planteService;
    }


    @GetMapping
    public ResponseEntity<List<Plante>> getAllPlantes() {
        return ResponseEntity.ok(planteService.getAllPlantes());
    }


    @PostMapping
    public ResponseEntity<Plante> addPlante(@RequestBody Plante plante) {
        return ResponseEntity.ok(planteService.addPlante(plante));
    }



    @PutMapping("/{id}")
    public ResponseEntity<Plante> updatePlante(@PathVariable Long id, @RequestBody Plante plante) {
        return ResponseEntity.ok(planteService.updatePlante(id, plante));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlante(@PathVariable Long id) {
        planteService.deletePlante(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Plante> getPlantById(@PathVariable Long id) {
        Plante plante = planteService.getPlantById(id);
        return ResponseEntity.ok(plante);
    }
}

