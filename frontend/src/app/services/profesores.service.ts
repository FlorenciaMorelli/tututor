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

  getProfesores() {
    return this.http.get(this.apiURL);
  }
  
  getProfesoresConParametros(id: any) {
    return this.http.get(this.apiURL + '/' + id);
  }

}
