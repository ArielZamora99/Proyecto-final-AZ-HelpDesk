import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn:'root'
})
export class AZHistorialService {

  private url = `${environment.apiUrl}/historial`;
 
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