/*
=============================================================
 PROYECTO: HELP DESK AZ
 AUTOR: ARIEL ZAMORA
=============================================================
*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AZAuthService {

    private api = `${environment.apiUrl}/auth`;
   
    constructor(private http: HttpClient) {}

    login(datos:any){
        return this.http.post( `${this.api}/login`, datos );
    }

   registrar(datos:any){
        return this.http.post(`${environment.apiUrl}/usuarios`, datos);
    }

}