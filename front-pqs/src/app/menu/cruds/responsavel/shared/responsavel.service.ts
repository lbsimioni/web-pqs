import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../../../../shared';

@Injectable({
  providedIn: 'root'
})
export class ResponsavelService {
    private api: string = `${environment.api}/responsavel`;
    
    constructor(
        private http: HttpClient
    ) { }

    /**
     * Método utilizado para obter lista de responsáveis cadastrados
     * @returns Observable<Response>
     */
    listar(): Observable<Response> {
        return this.http.get<any>(`${this.api}`);
    }

    /**
     * Método utilizado para salvar um responsavel
     * @returns Observable<Response>
     */
    salvar(responsavel: any): Observable<Response> {
        return this.http.post<any>(`${this.api}`, responsavel);
    }

    /**
     * Método utilizado para salvar um responsavel
     * @returns Observable<Response>
     */
    alterar(responsavel: any): Observable<Response> {
        return this.http.put<any>(`${this.api}`, responsavel);
    }

    /**
     * Método utilizado para obter um responsável
     * @returns Observable<Response>
     */
    obter(codigo: number): Observable<Response> {
        return this.http.get<any>(`${this.api}/${codigo}`);
    }

    /**
     * Método utilizado para obter um responsável pelo rg
     * @returns Observable<Response>
     */
    obterRg(rg: any): Observable<Response> {
        return this.http.get<any>(`${this.api}/findByRg/${rg}`);
    }
}
