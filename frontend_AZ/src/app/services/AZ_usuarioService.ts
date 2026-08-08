import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn:'root'
})
export class AZUsuarioService {

  private url = 'http://localhost:3000/api/usuarios'; //url node backend puerto 300

  constructor(private http: HttpClient){}

  //get general
  obtenerUsuarios(){
    return this.http.get(this.url);
  }

  obtenerPerfil(id:number){
    return this.http.get(`${this.url}/perfil/${id}`);
  }
  //get por id
  obtenerUsuarioPorId(id:number){
    return this.http.get(`${this.url}/${id}`);
  }
  // get por rol de tecnico
  obtenerTecnicos(){
    return this.http.get(`${this.url}/tecnicos`);
  }
  // post crear usuario
  crearUsuario(usuario:any){
    return this.http.post(this.url, usuario);
  }
  // put modificar usuario
  actualizarUsuario(id:number, usuario:any){
    return this.http.put(`${this.url}/${id}`, usuario);
  }
  // delete eliminar usuario
  eliminarUsuario(id:number){
    return this.http.delete(`${this.url}/${id}`);
  }

}