import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../../../../shared';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
    private api: string = `${environment.api}/produto`;

    constructor(
        private http: HttpClient
    ) { }

    /**
     * Método utilizado para salvar um produto
     * @returns Observable<Response>
     */
    salvar(produto: any): Observable<Response> {
        return this.http.post<any>(`${this.api}`, produto);
    }

    /**
     * Método utilizado para obter lista de produtos cadastrados
     * @returns Observable<Response>
     */
    listar(): Observable<Response> {
        return this.http.get<any>(`${this.api}`);
    }

    /**
     * Método utilizado para obter um produto
     * @returns Observable<Response>
     */
    obter(codigo: number): Observable<Response> {
        return this.http.get<any>(`${this.api}/${codigo}`);
    }

    /**
     * Método utilizado para alterar um produto
     * @returns Observable<Response>
     */
    alterar(produto: any): Observable<Response> {
        return this.http.put<any>(`${this.api}`, produto);
    }
}
