import { environment } from '../../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../../../../../shared';

@Injectable({
  providedIn: 'root'
})
export class EntradaService {

    private api: string = `${environment.api}/produto/entrada`;

    constructor(
        private http: HttpClient
    ) { }

    /**
     * Método utilizado para salvar uma entrada
     * @returns Observable<Response>
     */
    salvar(entrada: any): Observable<Response> {
        return this.http.post<any>(`${this.api}`, entrada);
    }

    /**
     * Método utilizado para obter lista de entradas cadastrados
     * @returns Observable<Response>
     */
    listar(): Observable<Response> {
        return this.http.get<any>(`${this.api}`);
    }

    /**
     * Método utilizado para obter uma entrada
     * @returns Observable<Response>
     */
    obter(codigo: number): Observable<Response> {
        return this.http.get<any>(`${this.api}/${codigo}`);
    }
}
