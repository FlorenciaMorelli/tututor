import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Materia } from '../helpers/interfaces/materia';

const apiUrl = environment.apiUrl + '/materias';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  private http = inject(HttpClient);

  constructor() {}
  
  getAllMaterias(): Observable<Materia> {
    return this.http.get<Materia>(apiUrl);
  }

  getMateriasConParametros(id: any): Observable<Materia> {
    return this.http.get<Materia>(apiUrl + '/' + id);
  }

  editarMateria(id: any, value: any): Observable<Materia>{
    return this.http.patch<Materia>(apiUrl + '/' + id, value);
  }

  postMateria(value: any): Observable<Materia>{
    return this.http.post<Materia>(apiUrl, value);
  }

  deleteMateria(id: any): Observable<Materia> {
    return this.http.delete<Materia>(apiUrl + "/" + id);
  }
}