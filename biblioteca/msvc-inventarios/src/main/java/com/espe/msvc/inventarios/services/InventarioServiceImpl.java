package com.espe.msvc.inventarios.services;

import com.espe.msvc.inventarios.models.entity.Inventario;
import com.espe.msvc.inventarios.repositories.InventarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class InventarioServiceImpl implements InventarioService {
    
    @Autowired
    private InventarioRepository repository;

    @Override
    @Transactional(readOnly = true)
    public List<Inventario> listar() {
        return (List<Inventario>) repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Inventario> porId(Long id) {
        return repository.findById(id);
    }

    @Override
    @Transactional
    public Inventario guardar(Inventario inventario) {
        return repository.save(inventario);
    }

    @Override
    @Transactional
    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}