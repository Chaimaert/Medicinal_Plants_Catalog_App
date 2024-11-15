package com.example.Plantes.Controller;


import com.example.Plantes.Entities.Plante;
import com.example.Plantes.Service.PlanteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/plantes")
public class AdminController {

    @Autowired
    private PlanteService planteService;

    @GetMapping
    public List<Plante> getAllPlantes() {
        return planteService.getAllPlantes();
    }

    @PostMapping
    public Plante addPlante(@RequestBody Plante plante) {
        return planteService.addPlante(plante);
    }

    @PutMapping("/{id}")
    public Plante updatePlante(@PathVariable Long id, @RequestBody Plante plante) {
        return planteService.updatePlante(id, plante);
    }

    @DeleteMapping("/{id}")
    public void deletePlante(@PathVariable Long id) {
        planteService.deletePlante(id);
    }
}