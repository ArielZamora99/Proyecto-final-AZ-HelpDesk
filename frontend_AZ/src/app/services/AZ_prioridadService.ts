import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn:'root' })

export class AZPrioridadService{ 

  private url = 'http://localhost:3000/api/prioridades';

  constructor( private http:HttpClient ){}
  // get obtener todas las prioridades disponibles
  obtenerPrioridades(){
    return this.http.get( this.url );
  }
  // post crear prioridad
  crearPrioridad(prioridad:any){
    return this.http.post( this.url, prioridad );
  }
  // put modificar prioridad
  actualizarPrioridad(id:number, prioridad:any){
    return this.http.put( `${this.url}/${id}`, prioridad );
  }
  //eliminar prioridad, si tiene ticket no permite eliminacion pero si cambio de estado ACTIVO, DESACTIVADO
  eliminarPrioridad(id:number){
    return this.http.delete( `${this.url}/${id}`);
  }

}