import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {
  private apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = 'http://localhost/tututor/backend/profesores';
  }

  getAllProfesores(): Observable<any>{
    return this.http.get(this.apiURL);
  }
  
  getProfesoresConParametros(id: any) {
    return this.http.get(this.apiURL + '/' + id);
  }
  
  getIDProfesor(id: any) {
    return this.http.get('http://localhost/tututor/backend/profesor/' + id);
  }

  editarProfesor(idProfesor: number, value: any){
    return this.http.patch(this.apiURL + '/' + idProfesor, value);
  }

  postProfesor(value: any){
    return this.http.post(this.apiURL, value);
  }

  deleteProfesor(id: any) {
    return this.http.delete(this.apiURL + "/" + id);
  }
}
