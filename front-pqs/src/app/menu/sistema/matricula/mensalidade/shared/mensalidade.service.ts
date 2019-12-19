import { environment } from '../../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../../../../../shared';

@Injectable({
  providedIn: 'root'
})
export class MensalidadeService {

    private api: string = `${environment.api}/matricula/mensalidade`;

    constructor(
        private http: HttpClient
    ) { }

    /**
     * Método utilizado para obter lista de mensalidades cadastrados
     * @returns Observable<Response>
     */
    listar(): Observable<Response> {
        return this.http.get<any>(`${this.api}`);
    }

    /**
     * Método utilizado para pagar uma mensalidades
     * @returns Observable<Response>
     */
    pagar(codigo: any): Observable<Response> {
        return this.http.delete<any>(`${this.api}/${codigo}`);
    }
}
