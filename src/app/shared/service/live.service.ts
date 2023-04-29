import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ResponsePageable } from '../model/responsePageable.model';
import { Live } from '../model/live.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LiveService {
  apiURL = 'http://localhost:8080/lives';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  public getLivesWithFlag({
    flag,
  }: {
    flag: string;
  }): Observable<ResponsePageable> {
    return this.httpClient.get<ResponsePageable>(this.apiURL + '?flag=' + flag);
  }

  public postLives(live: any): Observable<Live> {
    return this.httpClient.post<any>(this.apiURL, live, this.httpOptions);
  }

  public updateLive(live: any): Observable<Live> {
    console.log('');
    return this.httpClient.put<Live>(
      `${this.apiURL}/${live.id}`, //
      live,
      this.httpOptions
    );
  }

  deleteLive(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiURL}/${id}`);
  }
}
