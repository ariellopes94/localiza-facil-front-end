import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from './../config/api.config';
import { Injectable } from '@angular/core';
import { Farmacia } from '../models/farmacia';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FarmaciaService {

  constructor(public http: HttpClient) { }

  create(farmacia: Farmacia): Observable<Farmacia> {
    return this.http.post<Farmacia>(
      `${API_CONFIG.baseUrl}/farmacia`,
      farmacia
    );
  }
}
