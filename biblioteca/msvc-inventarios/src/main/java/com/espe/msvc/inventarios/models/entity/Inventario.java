package com.espe.msvc.inventarios.models.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "inventario")
public class Inventario {
    
    //Atributos
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_inventario;

    @ManyToOne
    @JoinColumn(name = "libro_id")
    private Libro libro;

    @NotNull
    private Integer cantidad;

    //Getter y Setter

    public Long getId_inventario() {
        return id_inventario;
    }

    public void setId_inventario(Long id_inventario) {
        this.id_inventario = id_inventario;
    }

    public Libro getLibro() {
        return libro;
    }

    public void setLibro(Libro libro) {
        this.libro = libro;
    }

    public Integer getCantidad() {
        return cantidad;
    }

    public void setCantidad(Integer cantidad) {
        this.cantidad = cantidad;
    }
    
    
    
}
