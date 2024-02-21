import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlumnosResenasService {
  private apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = 'http://localhost/tututor/backend/alumnosresenas';
  }
  
  getAlumnosResenas() {
    return this.http.get(this.apiURL);
  }
  
  getAllResenasDadasPorIDUsuario(id: number) {
    return this.http.get(this.apiURL + 'dadas/' + id);
  }
  
  getAllResenasRecibidasPorIDUsuario(id: number) {
    return this.http.get(this.apiURL + 'recibidas/' + id);
  }
}
