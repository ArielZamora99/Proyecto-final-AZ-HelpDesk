import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn:'root' })

export class AZEstadoService{

  private url = `${environment.apiUrl}/estados`;
  

  constructor( private http:HttpClient ){}

  obtenerEstados(){
    return this.http.get( this.url );
  }

  crearEstado(estado:any){
    return this.http.post( this.url, estado);
  }

  actualizarEstado(id:number, estado:any){
    return this.http.put( `${this.url}/${id}`, estado );
  }

  eliminarEstado(id:number){
    return this.http.delete( `${this.url}/${id}`);
  }
}