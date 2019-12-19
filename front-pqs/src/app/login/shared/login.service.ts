import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../../shared';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

    private api: string = `${environment.api}`;

    constructor(
      private http: HttpClient
    ) { }

    /**
     * Método utilizado para validar login
     * @returns Observable<Response>
     */
    validar(login: any): Observable<Response> {
        return this.http.post<any>(`${this.api}/funcionario/login`, login);
    }

}
