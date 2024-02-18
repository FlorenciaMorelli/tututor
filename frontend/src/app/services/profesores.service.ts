import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {
  private apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = 'http://localhost/tututor/backend/profesores';
  }

  getAllProfesores() {
    return this.http.get(this.apiURL);
  }
  
  getProfesoresConParametros(id: any) {
    return this.http.get(this.apiURL + '/' + id);
  }

  editarProfesor(id: any, value: any){
    return this.http.patch(this.apiURL + '/' + id, value);
  }

  postProfesor(value: any){
    return this.http.post(this.apiURL, value);
  }

  deleteProfesor(id: any) {
    return this.http.delete(this.apiURL + "/" + id);
  }
}
