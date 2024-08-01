package com.espe.msvc.notificaciones.services;

import com.espe.msvc.notificaciones.models.entity.Notificacion;
import com.espe.msvc.notificaciones.repositories.NotificacionRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class NotificacionServiceImpl implements NotificacionService {
    
    @Autowired
    private NotificacionRepository repository;

    @Override
    @Transactional(readOnly = true)
    public List<Notificacion> listar() {
        return (List<Notificacion>) repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Notificacion> porId(Long id) {
        return repository.findById(id);
    }

    @Override
    @Transactional
    public Notificacion guardar(Notificacion notificacion) {
        return repository.save(notificacion);
    }

    @Override
    @Transactional
    public void eliminar(Long id) {
        repository.deleteById(id);
    }
    
}
