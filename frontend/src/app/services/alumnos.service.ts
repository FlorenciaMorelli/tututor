import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  
  getAlumnosConParametros(id: number) {
    return this.http.get(this.apiURL + '/' + id);
  }

  editarAlumno(id: any, value: any){
    return this.http.patch(this.apiURL + '/' + id, value);
  }

  postAlumno(value: any){
    return this.http.post(this.apiURL, value);
  }

  deleteAlumno(id: any) {
    return this.http.delete(this.apiURL + "/" + id);
  }
}
