import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { AZEstadoService } from '../../services/AZ_estadoService';
import { RouterLink } from '@angular/router';

@Component({
  selector:'app-estados',
  imports:[
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl:'./estados.html',
  styleUrl:'./estados.css'
})
export class Estados{
  estados:any[]=[];
  id_estado=0;
  nombre='';
  descripcion='';
  
  constructor( private estadoService:AZEstadoService, private cd: ChangeDetectorRef){}

  ngOnInit(){
    this.cargarEstados();
  }
  cargarEstados(){
    this.estadoService
    .obtenerEstados()
    .subscribe({
      next:(respuesta:any)=>{
        this.estados = respuesta;
        this.cd.detectChanges();
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }
  guardarEstado(){
    const datos={
      nombre:this.nombre,
      descripcion:this.descripcion,
      activo:true
    };
    if(this.id_estado){
      this.estadoService
      .actualizarEstado(
        this.id_estado,
        datos
      )
      .subscribe(()=>{
        alert("Estado actualizado correctamente");
         window.location.reload();
        this.cargarEstados();
        this.limpiar();
      });
    }else{
      this.estadoService
      .crearEstado(datos)
      .subscribe(()=>{
        alert("Estado creado correctamente");
         window.location.reload();
        this.cargarEstados();
        this.limpiar();
      });
    }
  }
  editar(estado:any){
    this.id_estado   = estado.id_estado;
    this.nombre      = estado.nombre;
    this.descripcion = estado.descripcion;
  }
  eliminar(id:number){
    if(!confirm("¿Desea cambiar el estado de este registro?")){
      return;
    }
    this.estadoService
    .eliminarEstado(id)
    .subscribe(()=>{
       window.location.reload();
      this.cargarEstados();
    });
  }
  limpiar(){
    this.id_estado=0;
    this.nombre='';
    this.descripcion='';
  }
}