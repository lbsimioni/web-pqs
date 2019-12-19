import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../../../../shared';

@Injectable({
  providedIn: 'root'
})
export class CartaoPontoService {

    private api: string = `${environment.api}/banco`;

    constructor(
        private http: HttpClient
    ) { }

    /**
       * Método utilizado para salvar um banco de horas
       * @returns Observable<Response>
       */
    salvar(banco: any): Observable<Response> {
        return this.http.post<any>(`${this.api}`, banco);
    }

    /**
     * Método utilizado para obter lista de bancos de horas cadastrados
     * @returns Observable<Response>
     */
    listar(): Observable<Response> {
        return this.http.get<any>(`${this.api}`);
    }

    /**
     * Método utilizado para obter um banco de horas
     * @returns Observable<Response>
     */
    obter(codigo: number): Observable<Response> {
        return this.http.get<any>(`${this.api}/${codigo}`);
    }

    /**
     * Método utilizado para alterar um banco de horas
     * @returns Observable<Response>
     */
    alterar(banco: any): Observable<Response> {
        return this.http.put<any>(`${this.api}`, banco);
    }
}
