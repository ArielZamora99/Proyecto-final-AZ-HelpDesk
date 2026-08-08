import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { AZCategoriaService } from '../../services/AZ_categoriaService';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categorias',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './categorias.html',
  styleUrl: './categorias.css'
})
export class Categorias {
  categorias: any[] = [];
  id_categoria = 0;
  nombre = '';
  descripcion = '';
  constructor(
    private categoriaService: AZCategoriaService,
    private cd: ChangeDetectorRef
  ){}
  ngOnInit(){
    this.cargarCategorias();
  }
  cargarCategorias(){
    this.categoriaService.obtenerCategorias()
    .subscribe({
      next:(respuesta:any)=>{
        this.categorias = respuesta;
        this.cd.detectChanges();
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }
  guardarCategoria(){
    if(this.nombre.trim() == ""){
      alert("Ingrese el nombre de la categoría");
      return;
    }
    const datos = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      activo: true
    };
    if(this.id_categoria){
      this.categoriaService
      .actualizarCategoria(this.id_categoria, datos)
      .subscribe({
        next:()=>{
          alert("Categoría actualizada");
          window.location.reload();
          this.cargarCategorias();
          this.limpiar();
        },
        error:(error)=>{
          console.log(error);
        }
      });
    }else{
      this.categoriaService
      .crearCategoria(datos)
      .subscribe({
        next:()=>{
          alert("Categoría creada");
          window.location.reload();
          this.cargarCategorias();
          this.limpiar();
        },
        error:(error)=>{
          console.log(error);
        }
      });
    }
  }
  editar(categoria:any){
    this.id_categoria = categoria.id_categoria;
    this.nombre = categoria.nombre;
    this.descripcion = categoria.descripcion;
  }
  eliminar(id:number){
    if(!confirm("¿Desea eliminar esta categoría?")){
      return;
    }
    this.categoriaService
    .eliminarCategoria(id)
    .subscribe({
      next:()=>{
        alert("Categoría eliminada correctamente");
        window.location.reload();
        this.cargarCategorias();
        this.limpiar();
      },
      error:(error)=>{
        console.log(error);
        alert("No se pudo eliminar la categoría");
      }
    });
  }
  limpiar(){
    this.id_categoria = 0;
    this.nombre = '';
    this.descripcion = '';
  }
}







