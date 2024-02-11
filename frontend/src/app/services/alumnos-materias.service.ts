import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlumnosMateriasService {
  private apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = 'http://localhost/tututor/backend/alumnosMaterias/1'/* + 'id' */;
  }
  getAlumnosMaterias() {
    return this.http.get(this.apiURL);
  }
}
