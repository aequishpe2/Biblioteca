package com.espe.msvc.prestamos.models.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.validation.constraints.NotEmpty;

import jakarta.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "prestamos")
public class Prestamo {
   
    //Atributos
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_prestamo;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "libro_id")
    private Libro libro;

    @NotEmpty
    private String fecha_prestamo;
    
    //Getter y Setter

    public Long getId_prestamo() {
        return id_prestamo;
    }

    public void setId_prestamo(Long id_prestamo) {
        this.id_prestamo = id_prestamo;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Libro getLibro() {
        return libro;
    }

    public void setLibro(Libro libro) {
        this.libro = libro;
    }

    public String getFecha_prestamo() {
        return fecha_prestamo;
    }

    public void setFecha_prestamo(String fecha_prestamo) {
        this.fecha_prestamo = fecha_prestamo;
    }
}
