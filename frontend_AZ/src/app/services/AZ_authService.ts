/*
=============================================================
 PROYECTO: HELP DESK AZ
 AUTOR: ARIEL ZAMORA
=============================================================
*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })

export class AZAuthService {

    private api = 'http://localhost:3000/api/auth';

    constructor(private http: HttpClient) {}

    login(datos:any){
        return this.http.post( `${this.api}/login`, datos );
    }

   registrar(datos:any){
        return this.http.post( 'http://localhost:3000/api/usuarios', datos );
    }

}