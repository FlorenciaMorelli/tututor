import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alumno } from '../helpers/interfaces/alumno';

const apiUrl = environment.apiUrl + '/alumnos';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private http = inject(HttpClient);

  constructor() {
  }

  getAllAlumnos(): Observable<Alumno> {
    return this.http.get<Alumno>(apiUrl);
  }
  
  getAlumnosConParametros(id: number): Observable<Alumno>{
    return this.http.get<Alumno>(apiUrl + '/' + id);
  }

  editarAlumno(id: number, value: any): Observable<Alumno>{
    return this.http.patch<Alumno>(apiUrl + '/' + id, value);
  }

  postAlumno(value: any): Observable<Alumno>{
    return this.http.post<Alumno>(apiUrl, value);
  }

  deleteAlumno(id: any): Observable<Alumno>{
    return this.http.delete<Alumno>(apiUrl + "/" + id);
  }
}