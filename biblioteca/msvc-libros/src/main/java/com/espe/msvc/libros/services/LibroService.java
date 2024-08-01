/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.espe.msvc.libros.services;

import com.espe.msvc.libros.models.entity.Libro;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author USER
 */
public interface LibroService {
    
    List<Libro> listar();
    Optional<Libro> porId(Long id);
    Libro guardar(Libro libro);
    void eliminar(Long id);
    
}
