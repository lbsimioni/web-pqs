import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../../../../shared';

@Injectable({
  providedIn: 'root'
})
export class RendimentoService {
    private api: string = `${environment.api}/rendimento`;

    constructor(
        private http: HttpClient
    ) { }

    /**
     * Método utilizado para obter lista de rendimento
     * @returns Observable<Response>
     */
    listar(): Observable<Response> {
        return this.http.get<any>(`${this.api}`);
    }

    /**
     * Método utilizado para obter lista de rendimento
     * @returns Observable<Response>
     */
    obterDashboard(): Observable<Response> {
        return this.http.get<any>(`${this.api}/dashboard`);
    }
}
