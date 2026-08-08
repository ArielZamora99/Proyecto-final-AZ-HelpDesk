import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { AZPrioridadService } from '../../services/AZ_prioridadService';
import { RouterLink } from '@angular/router';

@Component({

  selector:'app-prioridades',
  imports:[
    CommonModule,
    FormsModule,
    RouterLink
  ],

  templateUrl:'./prioridades.html',
  styleUrl:'./prioridades.css'
})


export class Prioridades{
  prioridades:any[]=[];
  id_prioridad = 0;
  nombre='';
  nivel:number = 1;

  constructor(
    private prioridadService:AZPrioridadService, 
    private cd: ChangeDetectorRef
  ){}
  ngOnInit(){
    this.cargarPrioridades();
  }
  cargarPrioridades(){
    this.prioridadService
    .obtenerPrioridades()
    .subscribe({
      next:(respuesta:any)=>{
        this.prioridades = respuesta;
        this.cd.detectChanges();
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }

  guardarPrioridad(){
    const datos={
      nombre:this.nombre,
      nivel:this.nivel,
      activo:true
    };
    if(this.id_prioridad){
      this.prioridadService
      .actualizarPrioridad(
        this.id_prioridad,
        datos
      )
      .subscribe(()=>{
        alert("Prioridad actualizada");
        window.location.reload();
        this.cargarPrioridades();
        this.limpiar();
      });
    }else{
      this.prioridadService
      .crearPrioridad(datos)
      .subscribe(()=>{
        alert("Prioridad creada");
        window.location.reload();
        this.cargarPrioridades();
        this.limpiar();
      });
    }
  }
  editar(prioridad:any){
    this.id_prioridad =  prioridad.id_prioridad;
    this.nombre       =  prioridad.nombre;
    this.nivel        =  prioridad.nivel;
  }
  eliminar(id:number){
    if(!confirm("¿Desea cambiar el estado de esta prioridad?")){
      return;
    }
    this.prioridadService
    .eliminarPrioridad(id)
    .subscribe(()=>{
      window.location.reload();
      this.cargarPrioridades();
    });
  }
  obtenerColorPrioridad(nivel:number){

  switch(nivel){
    case 1:
      return 'peligro';
    case 2:
      return 'advertencia';
    case 3:
      return 'proceso';
    case 4:
      return 'exito';
      default:
      return 'prioridad-normal';

  }

}
  limpiar(){
    this.id_prioridad=0;
    this.nombre='';
    this.nivel=1;
  }
}