package com.espe.msvc.pagos.repositories;

import com.espe.msvc.pagos.models.entity.Pago;
import org.springframework.data.repository.CrudRepository;

public interface PagoRepository extends CrudRepository<Pago, Long>{
    
}
