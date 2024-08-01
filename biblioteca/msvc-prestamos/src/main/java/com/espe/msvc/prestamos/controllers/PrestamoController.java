package com.espe.msvc.prestamos.controllers;

import com.espe.msvc.prestamos.models.entity.Libro;
import com.espe.msvc.prestamos.models.entity.Prestamo;
import com.espe.msvc.prestamos.services.PrestamoService;
import feign.FeignException;
import java.util.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
//@RequestMapping("/prestamos")
public class PrestamoController {
  
    @Autowired
    private PrestamoService service;

    @GetMapping
    public List<Prestamo> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Prestamo> detalle(@PathVariable Long id) {
        Optional<Prestamo> prestamoOptional = service.porId(id);
        return prestamoOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Prestamo> crear(@RequestBody Prestamo prestamo) {
        Prestamo nuevoPrestamo = service.guardar(prestamo);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoPrestamo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Prestamo> editar(@RequestBody Prestamo prestamo, @PathVariable Long id) {
        Optional<Prestamo> prestamoOptional = service.porId(id);
        if (prestamoOptional.isPresent()) {
            Prestamo prestamoDB = prestamoOptional.get();
            prestamoDB.setFecha_prestamo(prestamo.getFecha_prestamo());
            prestamoDB.setUsuario(prestamo.getUsuario());
            return ResponseEntity.ok().body(service.guardar(prestamoDB));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        Optional<Prestamo> prestamoOptional = service.porId(id);
        if (prestamoOptional.isPresent()) {
            service.eliminar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
