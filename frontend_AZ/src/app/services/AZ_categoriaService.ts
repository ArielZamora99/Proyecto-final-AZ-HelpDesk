import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn:'root' })

export class AZCategoriaService{

  private url = 'http://localhost:3000/api/categorias';

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