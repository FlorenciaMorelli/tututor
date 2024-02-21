import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresResenasService {
  private apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = 'http://localhost/tututor/backend/profesoresResenas';
  }
  
  getProfesoresResenas() {
    return this.http.get(this.apiURL);
  }
  
  getAllResenasDadasPorIDUsuario(id: number) {
    return this.http.get(this.apiURL + 'Dadas/' + id);
  }
  
  getAllResenasRecibidasPorIDUsuario(id: number) {
    return this.http.get(this.apiURL + 'Recibidas/' + id);
  }
}
