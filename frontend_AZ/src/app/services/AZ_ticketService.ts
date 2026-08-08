import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class AZTicketService {
  private url = `${environment.apiUrl}/tickets`;
  constructor( private http: HttpClient ) {}
  
  // Obtener todos los tickets
  obtenerTickets(){ 
    return this.http.get( this.url );
  }

  // get
 obtenerTicketsAdministracion(){
    return this.http.get( `${this.url}/administracion/listado` );
  }
  
  //get
  obtenerHistorial(){
    return this.http.get(`${environment.apiUrl}/historial`);
  }

  //get 
  obtenerHistorialTickets(id:number){
    return this.http.get(`${environment.apiUrl}/historial/${id}`);
  }

  // get Obtener ticket por ID
  obtenerTicketPorId(id:number){
    return this.http.get(`${this.url}/${id}`);
  }

  //get
  obtenerTicketsTecnico(id:number){
    return this.http.get( `${this.url}/tecnico/${id}` );
  }

  //get
  obtenerTicketsUsuario(id:number){
    return this.http.get( `${this.url}/usuario/${id}` );
  }

  // get prioridades
  obtenerPrioridades(){
    return this.http.get(`${environment.apiUrl}/prioridades`);
  }
 
  // get estados disponibles 
  obtenerEstados(){
     return this.http.get(`${environment.apiUrl}/estados`);
  }

  // POST Crear ticket
  crearTicket(ticket:any){
    return this.http.post(this.url, ticket);
  }

  // PUT Actualizar ticket
  actualizarTicket(id:number, ticket:any){
    return this.http.put( `${this.url}/${id}`, ticket );
  }

  // DELETE Eliminar ticket
  eliminarTicket(id:number){
    return this.http.delete( `${this.url}/${id}` );
  }
}