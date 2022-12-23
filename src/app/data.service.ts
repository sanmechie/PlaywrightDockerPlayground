import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map, retry } from 'rxjs/operators';
import { City } from './city';
import { throwError } from 'rxjs/internal/observable/throwError';

// let headers = new HttpHeaders();
// headers = headers.set('Content-Type', 'application/json; charset=utf-8');
@Injectable({
  providedIn: 'root'
})
export class DataService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': 'application/json',
    }),
  };

  private REST_API_SERVER = "http://127.0.0.1:9091";
  private newCity : City = {name: '', area: 0};

  constructor(private httpClient: HttpClient) { }

  public getCities(): Observable<any> {
    return this.httpClient.get(`${this.REST_API_SERVER}/cities`);

  }

  public addCity(citydata: City): Observable<any> {
    this.newCity.name = citydata.name;
    this.newCity.area = Number(citydata.area);
    console.log(this.newCity)
    return  this.httpClient.post<City>(`${this.REST_API_SERVER}/cities`, JSON.stringify(this.newCity), this.httpOptions).pipe(retry(1), catchError(this.handleError));

  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }

}