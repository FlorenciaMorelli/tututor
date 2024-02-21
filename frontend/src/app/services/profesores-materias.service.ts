import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Materia } from '../helpers/interfaces/materia';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresMateriasService {
  private apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = 'http://localhost/tututor/backend/profesoresmaterias';
  }

  getAllMateriasDelIDUsuario(idUsuario: number): Observable<Materia> {
    return this.http.get<Materia>(this.apiURL + '/' + idUsuario);
  }
}
