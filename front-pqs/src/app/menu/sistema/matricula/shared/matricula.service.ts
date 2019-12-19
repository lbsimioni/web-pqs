import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../../../../shared';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {
    private api: string = `${environment.api}/matricula`;

    constructor(
        private http: HttpClient
    ) { }

    /**
     * Método utilizado para salvar uma matricula
     * @returns Observable<Response>
     */
    salvar(matricula: any): Observable<Response> {
        return this.http.post<any>(`${this.api}`, matricula);
    }

    /**
     * Método utilizado para obter lista de matricula cadastrados
     * @returns Observable<Response>
     */
    listar(): Observable<Response> {
        return this.http.get<any>(`${this.api}`);
    }

    /**
     * Método utilizado para obter uma matricula
     * @returns Observable<Response>
     */
    obter(codigo: number): Observable<Response> {
        return this.http.get<any>(`${this.api}/${codigo}`);
    }

    /**
     * Método utilizado para alterar uma matricula
     * @returns Observable<Response>
     */
    alterar(matricula: any): Observable<Response> {
        return this.http.put<any>(`${this.api}`, matricula);
    }
}
