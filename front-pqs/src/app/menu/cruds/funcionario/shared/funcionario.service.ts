import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../../../../shared';


@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
    private api: string = `${environment.api}/funcionario`;

    constructor(
        private http: HttpClient
    ) { }

    /**
     * Método utilizado para obter lista de funcionários cadastrados
     * @returns Observable<Response>
     */
    listar(): Observable<Response>
    {
        return this.http.get<any>(`${this.api}`);
    }

    /**
     * Método utilizado para salvar um funcionário
     * @returns Observable<Response>
     */
    salvar(funcionario: any): Observable<Response> {
        return this.http.post<any>(`${this.api}`, funcionario);
    }
    
    /**
     * Método utilizado para salvar um funcionário
     * @returns Observable<Response>
     */
    alterar(funcionario: any): Observable<Response> {
        return this.http.put<any>(`${this.api}`, funcionario);
    }

    /**
     * Método utilizado para desativar um funcionário
     * @returns Observable<Response>
     */
    desativar(codigo: any): Observable<Response> {
        return this.http.delete<any>(`${this.api}/${codigo}`);
    }

    /**
     * Método utilizado para obter um funcionário
     * @returns Observable<Response>
     */
    obter(codigo: any): Observable<Response> {
        return this.http.get<any>(`${this.api}/${codigo}`);
    }

    /**
     * Método utilizado para obter um funcionário pelo rg
     * @returns Observable<Response>
     */
    obterRg(rg: any): Observable<Response> {
        return this.http.get<any>(`${this.api}/findByRg/${rg}`);
    }

}
