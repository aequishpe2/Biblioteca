package com.espe.msvc.inventarios.repositories;

import com.espe.msvc.inventarios.models.entity.Inventario;
import org.springframework.data.repository.CrudRepository;

public interface InventarioRepository extends CrudRepository<Inventario, Long> {
    
}
