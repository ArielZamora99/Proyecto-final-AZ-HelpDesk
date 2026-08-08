import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AZTicketService } from '../../services/AZ_ticketService';
import { AZEstadoService } from '../../services/AZ_estadoService';

@Component({
  selector: 'app-tickets-asignados',

  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],

  templateUrl: './tickets-asignados.html',
  styleUrl: './tickets-asignados.css'
})

export class TicketsAsignados {

  ticketsAsignados: any[] = [];

  estados: any[] = [];

  id_usuario!: number;


  constructor(
    private ticketService: AZTicketService,
    private estadoService: AZEstadoService,
    private cd: ChangeDetectorRef
  ) {}


  ngOnInit() {
    const datos = sessionStorage.getItem('usuario');
    if (!datos) {
      return;
    }
    const usuario = JSON.parse(datos);
    this.id_usuario = usuario.usuario.id_usuario;
    this.cargarTickets();
    this.cargarEstados();
  }

  /* ======================================================
     CARGAR TICKETS DEL TÉCNICO
  ====================================================== */
  cargarTickets() {
    this.ticketService
      .obtenerTicketsTecnico(this.id_usuario)
      .subscribe({
        next: (respuesta: any) => {
          this.ticketsAsignados = respuesta;
          this.cd.detectChanges();
        },
        error: (error: any) => {
          console.error(
            'Error al cargar tickets asignados:',
            error
          );
        }
      });
  }

  /* ======================================================
     CARGAR ESTADOS
  ====================================================== */
  cargarEstados() {
    this.estadoService
      .obtenerEstados()
      .subscribe({
        next: (respuesta: any) => {
          this.estados = respuesta.filter(
          (estado: any) => estado.activo === true
        );
          this.cd.detectChanges();

        },
        error: (error: any) => {
         console.error(
            'Error al cargar estados:',
            error
          );
        }
      });
  }
  /* ======================================================
     ACTUALIZAR ESTADO DEL TICKET
  ====================================================== */
  actualizarEstado(ticket: any) {
    const datos = {
      titulo: ticket.titulo,
      descripcion: ticket.descripcion,
      /*
       * Conservamos el técnico que YA tiene el ticket.
       */
      id_tecnico: ticket.id_tecnico,
      id_categoria: ticket.id_categoria,
      id_prioridad: ticket.id_prioridad,
      id_estado: Number(ticket.id_estado)

    };


    this.ticketService
      .actualizarTicket(
        ticket.id_ticket,
        datos
      )
      .subscribe({

        next: () => {

          alert('Estado actualizado correctamente');

          /*
           * Volvemos a cargar los tickets
           * para mostrar el nuevo estado.
           */
          this.cargarTickets();

        },

        error: (error: any) => {

          console.error(
            'Error al actualizar estado:',
            error
          );

        }

      });

  }

}