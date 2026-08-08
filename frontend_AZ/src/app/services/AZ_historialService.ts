import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn:'root'
})
export class AZHistorialService {
  private url = 'http://localhost:3000/api/historial';

  constructor( private http:HttpClient ){}

  obtenerHistorial(){
    return this.http.get(  this.url  );
  }

  obtenerHistorialUsuario(id:number){ 
      return this.http.get( `${this.url}/usuario/${id}` );
  }

  obtenerHistorialTecnico(id:number){
    return this.http.get(  `${this.url}/tecnico/${id}` );
  }
}