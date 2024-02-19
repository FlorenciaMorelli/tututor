import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = 'http://localhost/tututor/backend/usuarios';
  }

  getAllUsuarios() {
    return this.http.get(this.apiURL);
  }
  
  getUsuariosConParametros(id: number) {
    return this.http.get(this.apiURL + '/' + id);
  }

  editarUsuario(id: any, value: any){
    return this.http.patch(this.apiURL + '/' + id, value);
  }

  postUsuario(value: any){
    return this.http.post(this.apiURL, value);
  }

  deleteUsuario(id: any) {
    return this.http.delete(this.apiURL + "/" + id);
  }
}
