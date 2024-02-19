import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Profesor } from '../helpers/interfaces/profesor';

const apiUrl = environment.apiUrl + '/profesores';
/* const apiKey = environment.apiKey; */
@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {
  private http = inject(HttpClient);

  constructor() {}

  getAllProfesores(): Observable<Profesor>{
    return this.http.get<Profesor>(apiUrl);
    /* return this.http.get(`${apiUrl}?api_key=${apiKey}`); */
  }
  
  getProfesoresConParametros(id: any): Observable<Profesor> {
    return this.http.get<Profesor>(apiUrl + '/' + id);
  }
  
  getIDProfesor(id: any): Observable<Profesor> {
    return this.http.get<Profesor>('http://localhost/tututor/backend/profesor/' + id);
  }

  editarProfesor(idProfesor: number, value: any): Observable<Profesor>{
    return this.http.patch<Profesor>(apiUrl + '/' + idProfesor, value);
  }

  postProfesor(value: any): Observable<Profesor>{
    return this.http.post<Profesor>(apiUrl, value);
  }

  deleteProfesor(id: any): Observable<Profesor> {
    return this.http.delete<Profesor>(apiUrl + "/" + id);
  }
}
