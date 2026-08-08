import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn:'root' })

export class AZCategoriaService{

  private url = `${environment.apiUrl}/categorias`;
  
  constructor( private http:HttpClient ){}

  obtenerCategorias(){
    return this.http.get( this.url );
  }

  crearCategoria(categoria:any){ 
    return this.http.post( this.url, categoria );
  }

  actualizarCategoria(id:number,categoria:any){
    return this.http.put( `${this.url}/${id}`, categoria);
  }

  eliminarCategoria(id:number){
    return this.http.delete( `${this.url}/${id}` );
  }
}