import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AZUsuarioService } from '../../services/AZ_usuarioService';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';


@Component({

selector:'app-actualizar-perfil',

imports:[
 CommonModule,
 FormsModule,
 RouterLink
],

templateUrl:'./actualizar-perfil.html',

styleUrl:'./actualizar-perfil.css'

})


export class ActualizarPerfil {


id_usuario!:number;


nombres='';
apellidos='';
correo='';
telefono='';


constructor(

private usuarioService:AZUsuarioService,
private router:Router

){}



ngOnInit(){

const datos=sessionStorage.getItem('usuario');


if(datos){

const sesion=JSON.parse(datos);


this.id_usuario=
sesion.usuario.id_usuario;


this.cargarUsuario();


}


}



cargarUsuario(){


this.usuarioService
.obtenerUsuarioPorId(this.id_usuario)
.subscribe({

next:(usuario:any)=>{

this.nombres=usuario.nombres;
this.apellidos=usuario.apellidos;
this.correo=usuario.correo;
this.telefono=usuario.telefono;


}

});


}




guardar(){


const datos={

nombres:this.nombres,

apellidos:this.apellidos,

correo:this.correo,

telefono:this.telefono,

id_rol:3

};



this.usuarioService
.actualizarUsuario(
this.id_usuario,
datos
)
.subscribe({

next:()=>{

alert(
"Datos actualizados correctamente"
);


this.router.navigate(['/perfil']);

}

});


}


}