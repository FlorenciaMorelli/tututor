import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumnos } from '../helpers/interfaces/alumnos';

const apiUrl = environment.apiUrl;
/* const apiKey = environment.apiKey; */

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private http = inject(HttpClient);

  constructor() {
  }

  getAllAlumnos(): Observable<Alumnos> {
    return this.http.get<Alumnos>(apiUrl);
    /* return this.http.get(`${apiUrl}?api_key=${apiKey}`); */
  }
  
  getAlumnosConParametros(id: number) {
    return this.http.get(apiUrl + '/' + id);
  }

  editarAlumno(id: number, value: any){
    return this.http.patch(apiUrl + '/' + id, JSON.stringify(value));
  }

  postAlumno(value: any){
    return this.http.post(apiUrl, value);
  }

  deleteAlumno(id: any) {
    return this.http.delete(apiUrl + "/" + id);
  }
}