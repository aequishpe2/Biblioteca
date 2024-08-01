/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.espe.msvc.libros.controllers;

import com.espe.msvc.libros.models.entity.Libro;
import com.espe.msvc.libros.services.LibroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 *
 * @author USER
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
//@RequestMapping("/libros")
public class LibroController {
    
    @Autowired
    private LibroService service;

    @GetMapping
    public List<Libro> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Libro> detalle(@PathVariable Long id) {
        Optional<Libro> libroOptional = service.porId(id);
        return libroOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Libro> crear(@RequestBody Libro libro) {
        Libro nuevoLibro = service.guardar(libro);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoLibro);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Libro> editar(@RequestBody Libro libro, @PathVariable Long id) {
        Optional<Libro> libroOptional = service.porId(id);
        if (libroOptional.isPresent()) {
            Libro libroDB = libroOptional.get();
            libroDB.setTitulo(libro.getTitulo());
            libroDB.setAutor(libro.getAutor());
            return ResponseEntity.ok().body(service.guardar(libroDB));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        Optional<Libro> libroOptional = service.porId(id);
        if (libroOptional.isPresent()) {
            service.eliminar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    
}
