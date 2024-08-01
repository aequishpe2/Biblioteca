package com.espe.msvc.notificaciones.repositories;

import com.espe.msvc.notificaciones.models.entity.Notificacion;
import org.springframework.data.repository.CrudRepository;

public interface NotificacionRepository extends CrudRepository<Notificacion, Long> {
    
}
