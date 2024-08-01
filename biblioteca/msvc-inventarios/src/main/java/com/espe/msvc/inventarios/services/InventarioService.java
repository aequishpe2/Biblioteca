package com.espe.msvc.inventarios.services;

import com.espe.msvc.inventarios.models.entity.Inventario;
import java.util.List;
import java.util.Optional;

public interface InventarioService {
    
    List<Inventario> listar();
    Optional<Inventario> porId(Long id);
    Inventario guardar(Inventario inventario);
    void eliminar(Long id);
    
}
