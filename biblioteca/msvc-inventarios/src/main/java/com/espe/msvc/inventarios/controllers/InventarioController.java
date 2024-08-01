package com.espe.msvc.inventarios.controllers;

import com.espe.msvc.inventarios.models.entity.Inventario;
import com.espe.msvc.inventarios.services.InventarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
//@RequestMapping("/inventarios")
public class InventarioController {

    @Autowired
    private InventarioService service;

    @GetMapping
    public List<Inventario> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Inventario> detalle(@PathVariable Long id) {
        Optional<Inventario> inventarioOptional = service.porId(id);
        return inventarioOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Inventario> crear(@RequestBody Inventario inventario) {
        Inventario nuevoInventario = service.guardar(inventario);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoInventario);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Inventario> actualizar(@PathVariable Long id, @RequestBody Inventario inventario) {
        Optional<Inventario> inventarioOptional = service.porId(id);
        if (inventarioOptional.isPresent()) {
            Inventario inventarioExistente = inventarioOptional.get();
            inventarioExistente.setCantidad(inventario.getCantidad());
            Inventario inventarioActualizado = service.guardar(inventarioExistente);
            return ResponseEntity.ok(inventarioActualizado);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        Optional<Inventario> inventarioOptional = service.porId(id);
        if (inventarioOptional.isPresent()) {
            service.eliminar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

}
