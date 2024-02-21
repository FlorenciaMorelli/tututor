import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost/tututor/backend';
  private isLogged = false;

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    const url = `${this.apiUrl}/login.php`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(url, JSON.stringify(credentials), httpOptions)
  }

  logout() {
    localStorage.setItem('ID_USER', '');
    localStorage.setItem('ROL', '');
    localStorage.setItem('STATE', 'false');
    return this.http.post(this.apiUrl + '/logout.php', null).subscribe();
  }

  signup(credentials: any): Observable<any> {
    const url = `${this.apiUrl}/signup.php`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(url, JSON.stringify(credentials), httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}

