import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresMateriasService {
  private apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = 'http://localhost/tututor/backend/profesoresMaterias'/* + 'id' */;
  }
  getProfesoresMaterias(idProfesor: number) {
    return this.http.get(this.apiURL + '/' + idProfesor);
  }
}
