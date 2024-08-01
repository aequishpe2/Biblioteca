package com.espe.msvc.notificaciones.services;

import com.espe.msvc.notificaciones.models.entity.Notificacion;
import java.util.List;
import java.util.Optional;

public interface NotificacionService {
    
    List<Notificacion> listar();
    Optional<Notificacion> porId(Long id);
    Notificacion guardar(Notificacion notificacion);
    void eliminar(Long id);
    
}
