import { environment } from '../../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../../../../../shared';

@Injectable({
  providedIn: 'root'
})
export class VendasService {


    private api: string = `${environment.api}/produto/vendas`;

    constructor(
        private http: HttpClient
    ) { }

    /**
     * Método utilizado para salvar uma venda
     * @returns Observable<Response>
     */
    salvar(venda: any): Observable<Response> {
        return this.http.post<any>(`${this.api}`, venda);
    }

    /**
     * Método utilizado para obter lista de vendas cadastrados
     * @returns Observable<Response>
     */
    listar(): Observable<Response> {
        return this.http.get<any>(`${this.api}`);
    }

    /**
     * Método utilizado para obter uma venda
     * @returns Observable<Response>
     */
    obter(codigo: number): Observable<Response> {
        return this.http.get<any>(`${this.api}/${codigo}`);
    }

}
