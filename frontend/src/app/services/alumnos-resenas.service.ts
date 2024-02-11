import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlumnosResenasService {
  private apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = 'http://localhost/tututor/backend/alumnosresenas/1'/* + 'id' */;
  }
  getAlumnosResenas() {
    return this.http.get(this.apiURL);
  }
}
