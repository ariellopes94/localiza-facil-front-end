import { Bairro } from './../models/bairro';
import { API_CONFIG } from './../config/api.config';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BairroService {

  constructor(public http: HttpClient) { }

  create(bairro: Bairro): Observable<Bairro> {
    return this.http.post<Bairro>(
      `${API_CONFIG.baseUrl}/bairro`,
      bairro
    );
  }

  bairroFindAll(): Observable<Bairro[]> {
    return this.http.get<Bairro[]>(`${API_CONFIG.baseUrl}/bairro`);
  }
}
