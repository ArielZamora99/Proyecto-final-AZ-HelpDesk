import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { AZHistorialService } from '../../services/AZ_historialService';
import { RouterLink } from '@angular/router';


@Component({
selector:'app-historial',
imports:[
  CommonModule,
  RouterLink
],
templateUrl:'./historial.html',
styleUrl:'./historial.css'
})


export class Historial {
  historial:any[] = [];
  ticketsAgrupados:any[] = [];
  id_usuario!:number;
  rol!:number;

  constructor( private historialService:AZHistorialService, private cd:ChangeDetectorRef ){}

  ngOnInit(){
    const datos = sessionStorage.getItem('usuario');
    if(datos){
      const usuario = JSON.parse(datos);
      this.id_usuario = usuario.usuario.id_usuario;
      this.rol = usuario.usuario.id_rol;
      this.cargarHistorial();
    }
  }

  cargarHistorial(){
    if(this.rol === 3){
    // CLIENTE
    this.historialService
    .obtenerHistorialUsuario(this.id_usuario)
    .subscribe({
      next:(respuesta:any)=>{
        this.armarHistorial(respuesta);
      },
      error:(error:any)=>{
        console.log("Error historial cliente:",error);
      }
    });
  } else if(this.rol === 2){
      // TECNICO
      this.historialService
      .obtenerHistorialTecnico(this.id_usuario)
      .subscribe({
        next:(respuesta:any)=>{
          this.armarHistorial(respuesta);
        },
        error:(error:any)=>{
          console.log("Error historial tecnico:",error);
        }
      });
  } else if(this.rol === 1){
      // ADMINISTRADOR
      this.historialService
      .obtenerHistorial()
      .subscribe({
        next:(respuesta:any)=>{
          this.armarHistorial(respuesta);
        },
        error:(error:any)=>{
          console.log("Error historial administrador:",error);
        }
      });
    }
  }

  armarHistorial(respuesta:any[]){
    this.historial = respuesta;
    this.ticketsAgrupados = [];
    respuesta.forEach((item:any)=>{
    let ticket = this.ticketsAgrupados
      .find(t => t.codigo === item.codigo);
      if(ticket){
        ticket.eventos.push(item);
      }else{
        this.ticketsAgrupados.push({
          codigo:item.codigo,
          titulo:item.titulo,
          categoria:item.categoria,
          prioridad:item.prioridad,
          estado:item.estado,
          tecnico:item.tecnico,
            eventos:[ item ]
        });
      }
    });
    this.cd.detectChanges();
  }
}