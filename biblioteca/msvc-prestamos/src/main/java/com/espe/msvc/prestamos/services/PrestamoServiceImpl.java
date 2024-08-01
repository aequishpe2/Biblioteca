package com.espe.msvc.prestamos.services;

import com.espe.msvc.prestamos.clients.LibroClientRest;
import com.espe.msvc.prestamos.models.entity.Prestamo;
import com.espe.msvc.prestamos.repositories.PrestamoRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PrestamoServiceImpl implements PrestamoService {
    
    @Autowired
    private PrestamoRepository repository;
    
    @Autowired
    LibroClientRest libroClientRest;
     
     //

    @Override
    @Transactional(readOnly = true)
    public List<Prestamo> listar() {
        return (List<Prestamo>) repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Prestamo> porId(Long id) {
        return repository.findById(id);
    }

    @Override
    @Transactional
    public Prestamo guardar(Prestamo prestamo) {
        return repository.save(prestamo);
    }

    @Override
    @Transactional
    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}
