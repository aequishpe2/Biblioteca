/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.espe.msvc.prestamos.clients;

import com.espe.msvc.prestamos.models.entity.Libro;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


/**
 *
 * @author USER
 */

@FeignClient(name="msvc-libros", url="localhost:8006")
public interface LibroClientRest {
    
    @GetMapping("/{id}")
    Libro detalle(@PathVariable Long id);
    
    @PostMapping
    Libro crear(@RequestBody Libro libro);
    
}
