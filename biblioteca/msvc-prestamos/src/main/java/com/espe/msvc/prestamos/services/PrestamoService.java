package com.espe.msvc.prestamos.services;

import com.espe.msvc.prestamos.models.entity.Libro;
import com.espe.msvc.prestamos.models.entity.Prestamo;
import java.util.List;
import java.util.Optional;

public interface PrestamoService {
    
    List<Prestamo> listar();
    Optional<Prestamo> porId(Long id);
    Prestamo guardar(Prestamo prestamo);
    void eliminar(Long id);
    
}
