import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AZUsuarioService } from '../../services/AZ_usuarioService';
import { ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-perfil',
  imports:[
    CommonModule,
    RouterLink
  ],
  templateUrl:'./perfil.html',
  styleUrl:'./perfil.css'
})


export class Perfil {
  usuario:any;
  constructor(
    private usuarioService:AZUsuarioService,
    private cd: ChangeDetectorRef
  ){}

  ngOnInit(){
    const datos = sessionStorage.getItem('usuario');
    if(datos){
      const sesion = JSON.parse(datos);
      const id = sesion.usuario.id_usuario;
      this.usuarioService
      .obtenerPerfil(id)
      .subscribe({
        next:(respuesta:any)=>{
          this.usuario = respuesta;
          this.cd.detectChanges();
        },
        error:(error)=>{
          console.log(error);
        }
      });
    }
  }
}