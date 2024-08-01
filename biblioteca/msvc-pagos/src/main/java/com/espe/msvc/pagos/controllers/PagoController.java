package com.espe.msvc.pagos.controllers;
import com.espe.msvc.pagos.models.entity.Pago;
import com.espe.msvc.pagos.services.PagoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
//@RequestMapping("/pagos")
public class PagoController {
    
    @Autowired
    private PagoService service;

    @GetMapping
    public List<Pago> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pago> detalle(@PathVariable Long id) {
        Optional<Pago> pagoOptional = service.porId(id);
        return pagoOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Pago> crear(@RequestBody Pago pago) {
        Pago nuevoPago = service.guardar(pago);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoPago);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Pago> editar(@RequestBody Pago pago, @PathVariable Long id) {
        Optional<Pago> pagoOptional = service.porId(id);
        if (pagoOptional.isPresent()) {
            Pago pagoDB = pagoOptional.get();
            pagoDB.setMonto(pago.getMonto());
            pagoDB.setFecha_pago(pago.getFecha_pago());
            pagoDB.setUsuario(pago.getUsuario());
            return ResponseEntity.ok().body(service.guardar(pagoDB));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        Optional<Pago> pagoOptional = service.porId(id);
        if (pagoOptional.isPresent()) {
            service.eliminar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    
}
