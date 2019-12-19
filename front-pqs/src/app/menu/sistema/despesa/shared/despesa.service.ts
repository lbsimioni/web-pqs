import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../../../../shared';

@Injectable({
  providedIn: 'root'
})
export class DespesaService {
    private api: string = `${environment.api}/despesa`;

    constructor(
        private http: HttpClient
    ) { }

    /**
     * Método utilizado para salvar uma despesa
     * @returns Observable<Response>
     */
    salvar(despesa: any): Observable<Response> {
        return this.http.post<any>(`${this.api}`, despesa);
    }

    /**
     * Método utilizado para obter lista de despesas cadastrados
     * @returns Observable<Response>
     */
    listar(): Observable<Response> {
        return this.http.get<any>(`${this.api}`);
    }

    /**
     * Método utilizado para obter uma despesa
     * @returns Observable<Response>
     */
    obter(codigo: number): Observable<Response> {
        return this.http.get<any>(`${this.api}/${codigo}`);
    }

    /**
     * Método utilizado para alterar uma despesa
     * @returns Observable<Response>
     */
    alterar(despesa: any): Observable<Response> {
        return this.http.put<any>(`${this.api}`, despesa);
    }

    /**
     * Método utilizado para obter uma despesa pela data
     * @returns Observable<Response>
     */
    obterData(mes: any, ano: any): Observable<Response> {
        return this.http.get<any>(`${this.api}/findByDate/${mes}/${ano}`);
    }

    /**
     * Método utilizado para salvar uma despesa extra
     * @returns Observable<Response>
     */
    salvarExtra(despesa: any): Observable<Response> {
        return this.http.post<any>(`${this.api}/extra`, despesa);
    }

    /**
     * Método utilizado para alterar uma despesa extra
     * @returns Observable<Response>
     */
    alterarExtra(despesa: any): Observable<Response> {
        return this.http.put<any>(`${this.api}/extra`, despesa);
    }

    /**
     * Método utilizado para excluir uma despesa extra
     * @returns Observable<Response>
     */
    excluirExtra(codigo: number, codigoExtra: number): Observable<Response> {
        return this.http.delete<any>(`${this.api}/extra/${codigo}/${codigoExtra}`);
    }

}
