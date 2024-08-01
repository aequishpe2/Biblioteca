package com.espe.msvc.prestamos.repositories;

import com.espe.msvc.prestamos.models.entity.Prestamo;
import org.springframework.data.repository.CrudRepository;

public interface PrestamoRepository extends CrudRepository <Prestamo, Long> {
    
}
