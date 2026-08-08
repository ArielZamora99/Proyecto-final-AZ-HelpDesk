import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AZTicketService } from '../../services/AZ_ticketService';
import { AZUsuarioService } from '../../services/AZ_usuarioService';

@Component({
  selector:'app-administrar-tickets',
  imports:[
  CommonModule,
  FormsModule,
  RouterLink
  ],
  templateUrl:'./administrar-tickets.html',
  styleUrl:'./administrar-tickets.css'
})

export class AdministrarTickets{
  tickets:any[]=[];
  tecnicos:any[]=[];

  constructor(   private ticketService:AZTicketService , private usuarioService:AZUsuarioService,  private cd: ChangeDetectorRef ){}
  
  ngOnInit(){
      this.cargarTickets();
      this.cargarTecnicos();
  }
  
  cargarTickets(){
    this.ticketService
    .obtenerTicketsAdministracion()
    .subscribe({
      next:(respuesta:any)=>{
      this.tickets=respuesta;
      this.cd.detectChanges();
      },
      error:(error)=>{
        console.log('Error al cargar tickets:', error);
      }
    });
  }

  cargarTecnicos(){
    this.usuarioService
    .obtenerTecnicos()
    .subscribe((respuesta:any)=>{
      this.tecnicos=respuesta;
      this.cd.detectChanges();
    });
    error: (error: any) => {

          console.log('Error al cargar técnicos:', error); }
  }

  asignar(ticket:any){
    const datos={
      titulo:ticket.titulo,
      descripcion:ticket.descripcion,
      id_tecnico:Number(ticket.id_tecnico),
      id_categoria:ticket.id_categoria,
      id_prioridad:ticket.id_prioridad,
      id_estado:2

    };

    this.ticketService
    .actualizarTicket(ticket.id_ticket,datos)
    .subscribe({
        next: () => {
          alert('Ticket asignado');
          this.cargarTickets();
        },
        error: (error) => {
          console.log(
            'Error al asignar ticket:',
            error
          );
          alert('No se pudo asignar el ticket');
        }
      });
  }
}