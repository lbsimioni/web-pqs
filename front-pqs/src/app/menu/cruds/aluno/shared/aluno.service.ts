import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Response } from '../../../../shared';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
    private api: string = `${environment.api}/aluno`;

    constructor(
        private http: HttpClient
    ) { }

    /**
     * Método utilizado para obter lista de alunos cadastrados
     * @returns Observable<Response>
     */
    listar(): Observable<Response> {
        return this.http.get<any>(`${this.api}`);
    }

    /**
     * Método utilizado para desativar um aluno
     * @returns Observable<Response>
     */
    obter(codigo: number): Observable<Response> {
        return this.http.get<any>(`${this.api}/${codigo}`);
    }

    /**
     * Método utilizado para desativar um aluno
     * @returns Observable<Response>
     */
    obterNomeCompleto(nome: string): Observable<Response> {
        return this.http.get<any>(`${this.api}/findByNameComplete/${nome}`);
    }

    /**
     * Método utilizado para salvar um aluno
     * @returns Observable<Response>
     */
    salvar(aluno: any): Observable<Response> {
        return this.http.post<any>(`${this.api}`, aluno);
    }

    /**
     * Método utilizado para alterar um aluno
     * @returns Observable<Response>
     */
    alterar(aluno: any): Observable<Response> {
        return this.http.put<any>(`${this.api}`, aluno);
    }

    /**
     * Método utilizado para desativar um aluno
     * @returns Observable<Response>
     */
    desativar(codigo: any): Observable<Response> {
        return this.http.delete<any>(`${this.api}/${codigo}`);
    }
}
