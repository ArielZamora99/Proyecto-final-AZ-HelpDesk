import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AZAuthService } from '../../services/AZ_authService';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  correo = '';
  password = '';

  mensaje = '';

  constructor(
    private authService: AZAuthService,
    private router: Router
  ) {}

  ingresar(){

    // Validación de campos
    if(!this.correo || !this.password){
      this.mensaje = 
      "Debe completar todos los campos";
      return;
    }
    const datos = {
      correo: this.correo,
      password: this.password
    };
    this.authService.login(datos)
    .subscribe({
      next:(respuesta:any)=>{
        console.log(
          "Respuesta backend:",
          respuesta
        );
        sessionStorage.setItem(
          'usuario',
          JSON.stringify(respuesta)
        );
        this.router.navigate([
          '/dashboard'
        ]);
      },
      error:(error)=>{
        console.log(
          "Error:",
          error
        );
        this.mensaje =
        "Correo o contraseña incorrectos";
      }
    });
  }
}