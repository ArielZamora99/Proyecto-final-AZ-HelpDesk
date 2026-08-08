import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AZTicketService } from '../../services/AZ_ticketService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AZPrioridadService } from '../../services/AZ_prioridadService';
import { AZEstadoService } from '../../services/AZ_estadoService';
import { AZCategoriaService } from '../../services/AZ_categoriaService';

@Component({
  selector: 'app-tickets',
  imports:[
    RouterLink,
    FormsModule,
    CommonModule
  ],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css',
})
export class Tickets {
    titulo = '';
    descripcion = '';
    id_categoria = '';
    id_prioridad = '';

    prioridades:any[] = [];
    estados:any[]=[];
    categorias:any[] = [];

    id_usuario!: number;

    mensaje = '';
    tipoMensaje = '';
    mostrarMensaje = false;


    constructor(
      private ticketService: AZTicketService,  
      private prioridadService: AZPrioridadService,
      private estadoService: AZEstadoService,
      private categoriaService: AZCategoriaService,  
      private router: Router,
    private cd: ChangeDetectorRef
    ){}

    ngOnInit(){
      const datos = sessionStorage.getItem('usuario');
      if(datos){
        const usuario = JSON.parse(datos);
        this.id_usuario = usuario.usuario.id_usuario;
      }

      this.cargarPrioridades();
      this.cargarCategorias();
      this.cargarEstados();

    }
    guardarTicket(){
      const datos = {
        titulo: this.titulo,
        descripcion: this.descripcion,
        id_usuario: this.id_usuario,
        id_categoria: Number(this.id_categoria),
        id_prioridad: Number(this.id_prioridad)
      };
      console.log(
        "Datos enviados:",
        datos
      );
      this.ticketService.crearTicket(datos)
      .subscribe({
        next:(respuesta:any)=>{
          alert("Ticket creado correctamente");    

          this.limpiar();         
          this.router.navigate(['/historial']);
            
        },
            error:(error)=>{
              console.log(error);
              alert("No se pudo crear el ticket");
            }
      });
    }
    cargarPrioridades(){
      this.prioridadService
      .obtenerPrioridades()
      .subscribe((respuesta:any)=>{
        this.prioridades=respuesta.filter(
          (prioridad: any) => prioridad.activo === true
        );
        this.cd.detectChanges();
      });
    }

    cargarCategorias(){
      this.categoriaService
      .obtenerCategorias()
      .subscribe({
        next:(respuesta:any)=>{
        this.categorias = respuesta.filter(
          (categoria: any) => categoria.activo === true
        );
        this.cd.detectChanges();
        },
        error:(error)=>{ console.log(error);  }
      }); 
    }

    cargarEstados(){
      this.estadoService
      .obtenerEstados()
      .subscribe((respuesta:any)=>{
        this.estados=respuesta.filter(
          (estado: any) => estado.activo === true
        );
        this.cd.detectChanges();
      });
    }

    limpiar(){
      this.titulo = '';
      this.descripcion = '';
      this.id_categoria = '';
      this.id_prioridad = '';
    }

}