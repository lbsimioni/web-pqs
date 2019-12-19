import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../../../../shared';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {
    private api: string = `${environment.api}/lucro`;

    constructor(
        private http: HttpClient
    ) { }

    /**
     * Método utilizado para obter lista de receita
     * @returns Observable<Response>
     */
    listar(): Observable<Response> {
        return this.http.get<any>(`${this.api}`);
    }

    /**
     * Método utilizado para obter uma receita
     * @returns Observable<Response>
     */
    obter(codigo: number): Observable<Response> {
        return this.http.get<any>(`${this.api}/${codigo}`);
    }

    /**
     * Método utilizado para obter uma receita pela data
     * @returns Observable<Response>
     */
    obterData(mes: any, ano: any): Observable<Response> {
        return this.http.get<any>(`${this.api}/findByDate/${mes}/${ano}`);
    }

    /**
     * Método utilizado para salvar uma receita extra
     * @returns Observable<Response>
     */
    salvarExtra(receita: any): Observable<Response> {
        return this.http.post<any>(`${this.api}/extra`, receita);
    }

    /**
     * Método utilizado para alterar uma receita extra
     * @returns Observable<Response>
     */
    alterarExtra(receita: any): Observable<Response> {
        return this.http.put<any>(`${this.api}/extra`, receita);
    }

    /**
     * Método utilizado para excluir uma receita extra
     * @returns Observable<Response>
     */
    excluirExtra(codigo: number, codigoExtra: number): Observable<Response> {
        return this.http.delete<any>(`${this.api}/extra/${codigo}/${codigoExtra}`);
    }
}
