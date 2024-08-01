/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.espe.msvc.libros.repositories;

import com.espe.msvc.libros.models.entity.Libro;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author USER
 */

public interface LibroRepository extends CrudRepository<Libro, Long> {
    
}
