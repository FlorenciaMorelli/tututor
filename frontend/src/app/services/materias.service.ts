import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  private apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = 'http://localhost/tututor/backend/materias';
  }
  
  getAllMaterias() {
    return this.http.get(this.apiURL);
  }

  getMateriasConParametros(id: any) {
    return this.http.get(this.apiURL + '/' + id);
  }
  editarMateria(id: any, value: any){
    return this.http.patch(this.apiURL + '/' + id, value);
  }

  postMateria(value: any){
    return this.http.post(this.apiURL, value);
  }

  deleteMateria(id: any) {
    return this.http.delete(this.apiURL + "/" + id);
  }
}