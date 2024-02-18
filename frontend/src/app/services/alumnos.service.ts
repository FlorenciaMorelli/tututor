import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = 'http://localhost/tututor/backend/alumnos';
  }

  getAllAlumnos() {
    return this.http.get(this.apiURL);
  }
  
  getAlumnosConParametros(id: any) {
    return this.http.get(this.apiURL + '/' + id);
  }
}
