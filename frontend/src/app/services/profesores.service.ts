import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {
  private apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = 'http://localhost/tututor/backend/profesores/';
  }

  getProfesores() {
    return this.http.get(this.apiURL);
  }
  
  getProfesoresConParametros(id: any) {
    return this.http.get(this.apiURL + '/' + id);
  }
  
  getIDProfesor(id: any) {
    return this.http.get('http://localhost/tututor/backend/profesor/' + id);
  }

  editarProfesor(idProfesor: number, value: any){
    return this.http.patch(this.apiURL + '/' + idProfesor, JSON.stringify(value));
  }
}
