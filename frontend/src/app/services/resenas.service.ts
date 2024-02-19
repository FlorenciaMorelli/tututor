import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResenasService {
  private apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = 'http://localhost/tututor/backend/resenas';
  }

  getResenas() {
    return this.http.get(this.apiURL);
  }
  
  getResenasdealumnosConParametros(id: any) {
    return this.http.get(this.apiURL + '/' + id);
  }
}
