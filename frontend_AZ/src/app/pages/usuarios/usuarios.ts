import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AZUsuarioService } from '../../services/AZ_usuarioService';

@Component({

  selector:'app-usuarios',

  imports:[
    CommonModule,
    FormsModule,
    RouterLink
  ],

  templateUrl:'./usuarios.html',
  styleUrl:'./usuarios.css'

})

export class Usuarios{

  usuarios:any[]=[];

    id_usuario=0;

    nombres='';
    apellidos='';
    correo='';
    password_hash='';
    telefono='';
    id_rol=3;

  constructor( private usuarioService:AZUsuarioService, private cd: ChangeDetectorRef ){}

  ngOnInit(){
    setTimeout(()=>{ this.cargarUsuarios(); },100);
  }

  cargarUsuarios(){
    this.usuarioService
    .obtenerUsuarios()
    .subscribe({
      next:(respuesta:any)=>{
        this.usuarios=respuesta;
        this.cd.detectChanges();

      },
      error:(error)=>{ console.log(error); }
    });
  }

  guardarUsuario(){
    if(
      this.nombres.trim()=='' ||
      this.apellidos.trim()=='' ||
      this.correo.trim()=='' ||
      this.telefono.trim()==''
      ){
      alert("Complete todos los campos");
      return;
      }

    if(this.id_usuario==0 && this.password_hash.trim()==''){
      alert("Ingrese una contraseña");
      return;
      }
    const datos={
        nombres:this.nombres,
        apellidos:this.apellidos,
        correo:this.correo,
        password_hash:this.password_hash,
        telefono:this.telefono,
        id_rol:Number(this.id_rol)
      };
      if(this.id_usuario){
        this.usuarioService
        .actualizarUsuario(
          this.id_usuario,
          datos
        )
        .subscribe({
          next:()=>{
            alert("Usuario actualizado correctamente");
            window.location.reload();
          },
          error:(error)=>{
            console.log(error);
            alert("No se pudo actualizar el usuario");
          }
        });
      }else{
        this.usuarioService
        .crearUsuario(datos)
        .subscribe({
          next:()=>{
            alert("Usuario creado correctamente");
            window.location.reload();
          },
          error:(error)=>{
            console.log(error);
            alert("No se pudo crear el usuario");
          }
        });
      }
  }

  editar(usuario:any){
    this.id_usuario=usuario.id_usuario;
    this.nombres=usuario.nombres;
    this.apellidos=usuario.apellidos;
    this.correo=usuario.correo;
    this.telefono=usuario.telefono;
    this.id_rol=usuario.id_rol;
    this.password_hash='';
  }
  
  eliminar(id:number){
    if(confirm("¿Desea eliminar este usuario?")){
      this.usuarioService
      .eliminarUsuario(id)
      .subscribe({
        next:()=>{
          alert("Usuario eliminado");
          window.location.reload();
        },
        error:(error)=>{
          console.log(error);
          alert("No se pudo eliminar el usuario");
        }
      });
    }
  }

  limpiar(){
    this.id_usuario=0;
    this.nombres='';
    this.apellidos='';
    this.correo='';
    this.password_hash='';
    this.telefono='';
    this.id_rol=3;
  }
}