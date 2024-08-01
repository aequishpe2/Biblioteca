package com.espe.msvc.pagos.services;
import com.espe.msvc.pagos.models.entity.Pago;
import java.util.List;
import java.util.Optional;

public interface PagoService {
    List<Pago> listar();
    Optional<Pago> porId(Long id);
    Pago guardar(Pago pago);
    void eliminar(Long id);
    
}
