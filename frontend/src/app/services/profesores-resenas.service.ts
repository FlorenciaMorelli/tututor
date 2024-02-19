import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresResenasService {
  private apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = 'http://localhost/tututor/backend/profesoresResenas'/* + 'id' */;
  }
  
  getProfesoresResenas() {
    return this.http.get(this.apiURL);
  }
  
  getProfesoresResenasDadasConParametros(idProfesor: number) {
    return this.http.get(this.apiURL + 'Dadas/' + idProfesor);
  }
  
  getProfesoresResenasRecibidasConParametros(idProfesor: number) {
    return this.http.get(this.apiURL + 'Recibidas/' + idProfesor);
  }
}
