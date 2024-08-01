/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.espe.msvc.libros.services;

import com.espe.msvc.libros.models.entity.Libro;
import com.espe.msvc.libros.repositories.LibroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 *
 * @author USER
 */

@Service
public class LibroServiceImpl implements LibroService{
    
    @Autowired
    private LibroRepository repository;

    @Override
    @Transactional(readOnly = true)
    public List<Libro> listar() {
        return (List<Libro>) repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Libro> porId(Long id) {
        return repository.findById(id);
    }

    @Override
    @Transactional
    public Libro guardar(Libro libro) {
        return repository.save(libro);
    }

    @Override
    @Transactional
    public void eliminar(Long id) {
        repository.deleteById(id);
    }
    
}
