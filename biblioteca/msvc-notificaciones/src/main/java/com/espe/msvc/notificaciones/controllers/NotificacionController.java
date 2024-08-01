package com.espe.msvc.notificaciones.controllers;

import com.espe.msvc.notificaciones.models.entity.Notificacion;
import com.espe.msvc.notificaciones.services.NotificacionService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
//@RequestMapping("/notificaciones")
public class NotificacionController {
    
    @Autowired
    private NotificacionService service;

    @GetMapping
    public List<Notificacion> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Notificacion> detalle(@PathVariable Long id) {
        Optional<Notificacion> notificacionOptional = service.porId(id);
        return notificacionOptional.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Notificacion> crear(@RequestBody Notificacion notificacion) {
        Notificacion nuevaNotificacion = service.guardar(notificacion);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaNotificacion);
    }
    
    

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        Optional<Notificacion> notificacionOptional = service.porId(id);
        if (notificacionOptional.isPresent()) {
            service.eliminar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    
}
