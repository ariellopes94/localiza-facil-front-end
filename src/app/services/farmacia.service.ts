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

  farmaciaFindAll(): Observable<Farmacia[]> {
    return this.http.get<Farmacia[]>(`${API_CONFIG.baseUrl}/farmacia`);
  }

  deleteById(id: string): Observable<Farmacia> {
    return this.http.delete<Farmacia>(
    `${API_CONFIG.baseUrl}/farmacia/${id}`);
  }

  editById(farmacia: Farmacia): Observable<Farmacia> {
    return this.http.put<Farmacia>(
      `${API_CONFIG.baseUrl}/farmacia/${farmacia.id}`,
      farmacia
    );
  }


  findById(id: string): Observable<Farmacia> {
    return this.http.get<Farmacia>(
      `${API_CONFIG.baseUrl}/farmacia/${id}`);
  }

  findByFarmaciaContains(nome: string): Observable<Farmacia[]> {
    return this.http.get<Farmacia[]>(
      `${API_CONFIG.baseUrl}/farmacia/buscarFarmacia?nome=${nome}`);
  }

  findByBairroLocalizadoId(bairroId: number, faramacia24Horas:boolean): Observable<Farmacia[]> {
    return this.http.get<Farmacia[]>(
      `${API_CONFIG.baseUrl}/farmacia/farmaciasPorLocalidade?bairroId=${bairroId}&faramacia24Horas=${faramacia24Horas}`);

      ///farmacia/farmaciasPorLocalidade?bairroId=1&faramacia24Horas=true
  }
}
