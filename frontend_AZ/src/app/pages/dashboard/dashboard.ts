import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AZTicketService } from '../../services/AZ_ticketService';


@Component({
  selector: 'app-dashboard',
  imports:[
    RouterLink,
    CommonModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard {

  usuario:any;

  nombreUsuario = '';
  rolUsuario = '';

  mensaje = '';
  mostrarMensaje = false;
  tipoMensaje = '';

  mostrarCliente = false;
  mostrarTecnico = false;
  mostrarAdministrador = false;


  totalTickets = 0;

  resumenPrioridades:any[]=[];
  resumenEstados:any[]=[];


  constructor(
    private router: Router,
    private ticketService: AZTicketService,
    private cd: ChangeDetectorRef
  ){}

  ngOnInit(){
    const notificacion = sessionStorage.getItem('notificacion');
    if(notificacion){
      this.mensaje = notificacion;
      this.tipoMensaje = 'exito';
      this.mostrarMensaje = true;
      sessionStorage.removeItem('notificacion');
      setTimeout(()=>{ this.mostrarMensaje = false; },3000);
    }
    const datos = sessionStorage.getItem('usuario');
    if(datos){
      this.usuario = JSON.parse(datos);
      const user = this.usuario.usuario;
      this.nombreUsuario =
      user.nombres + " " + user.apellidos;

      switch(user.id_rol){
        case 1:
          this.rolUsuario = "Administrador";
          this.mostrarAdministrador = true;
          this.cargarEstadisticas();
          break;
        case 2:
          this.rolUsuario = "Técnico";
          this.mostrarTecnico = true;
          break;
        case 3:
          this.rolUsuario = "Cliente";
          this.mostrarCliente = true;
          break;
      }
    }
  }
  cargarEstadisticas(){
    this.ticketService.obtenerTickets()
    .subscribe({
      next:(tickets:any)=>{

        this.totalTickets = tickets.length;
        this.cd.detectChanges();

        this.resumenPrioridades=[];
        this.cd.detectChanges();

        this.resumenEstados=[];
        this.cd.detectChanges();
        
        tickets.forEach((t:any)=>{

          let prioridad = this.resumenPrioridades
          .find(x=>x.nombre == t.prioridad);
          if(prioridad){
            prioridad.total++;
          }else{
            this.resumenPrioridades.push({ nombre:t.prioridad, total:1 });
          }

          let estado = this.resumenEstados
          .find(x=>x.nombre == t.estado);
          if(estado){
            estado.total++;
          }else{
            this.resumenEstados.push({ nombre:t.estado, total:1 });
          }
        });
        console.log(
          "Resumen prioridades:",
          this.resumenPrioridades
        );
        console.log(
          "Resumen estados:",
          this.resumenEstados
        );
        this.cd.detectChanges();
      },
      error:(error)=>{
        console.log(
          "Error estadísticas:",
          error
        );
      }
    });
  }

  obtenerColorEstado(estado:string){
    switch(estado){
      case 'Abierto':
        return 'advertencia';
      case 'Asignado':
        return 'primario';
      case 'En proceso':
        return 'proceso';
      case 'Resuelto':
       return 'exito';
      case 'Cerrado':
        return 'cerrado';
      default:
        return 'card';
    }
  }

  obtenerColorPrioridad(prioridad:string){
    switch(prioridad){
      case 'Crítica':
        return 'peligro';
      case 'Alta':
        return 'advertencia';
      case 'Media':
        return 'proceso';
      case 'Baja':
        return 'exito';
      default:
        return 'card';
    }
  }
  
  cerrarSesion(){
    sessionStorage.removeItem('usuario');
    this.router.navigate(['/']);
  }

}