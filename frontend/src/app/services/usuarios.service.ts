import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../helpers/interfaces/usuario';
import { environment } from '../../environments/environment';

const apiUrl = environment.apiUrl + '/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private http = inject(HttpClient);

  constructor() {}

  getAllUsuarios(): Observable<Usuario> {
    return this.http.get<Usuario>(apiUrl);
  }
  
  getUsuariosConParametros(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(apiUrl + '/' + id);
  }

  editarUsuario(id: any, value: any): Observable<Usuario>{
    return this.http.patch<Usuario>(apiUrl + '/' + id, value);
  }

  postUsuario(value: any): Observable<Usuario>{
    return this.http.post<Usuario>(apiUrl, value);
  }

  deleteUsuario(id: any): Observable<Usuario> {
    return this.http.delete<Usuario>(apiUrl + "/" + id);
  }
}
