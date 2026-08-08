import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AZAuthService } from '../../services/AZ_authService';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  imports: [
    FormsModule,
    CommonModule,
    RouterLink
    
  ],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {

  nombres = '';
  apellidos = '';
  correo = '';
  telefono = '';
  password = '';
  confirmarPassword = '';

  mensaje = '';
  constructor(
    private authService: AZAuthService,
    private router: Router
  ) {}
  registrar() {

    if (
      !this.nombres ||
      !this.apellidos ||
      !this.correo ||
      !this.telefono ||
      !this.password ||
      !this.confirmarPassword
    ) {
      this.mensaje = "Debe completar todos los campos";
      return;
    }
    if (this.password !== this.confirmarPassword) {
      this.mensaje = "Las contraseñas no coinciden";
      return;
    }
    const datos = {
        nombres: this.nombres,
        apellidos: this.apellidos,
        telefono: this.telefono,
        correo: this.correo,
        password_hash: this.password
    };

    this.authService.registrar(datos)
      .subscribe({
        next: (respuesta: any) => {
          console.log("Usuario creado:", respuesta);
          alert("Usuario registrado correctamente");
          this.router.navigate(['/']);

    },

    
        error: (error) => {
         console.log(error);
         this.mensaje = error.error.mensaje;
        }
      });
  }
}