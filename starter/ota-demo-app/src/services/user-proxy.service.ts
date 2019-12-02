import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BaseProxyService } from './base-proxy.service';

@Injectable()
export class UserProxyService extends BaseProxyService {
  public constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    super();
  }

  public getAll(): Observable<any> {
    const url = `${this.baseUrl}api/v1/users`;

    const requestOptions = this.getRequestOptions('application/json', 'application/json');

    return this.http.get(url, requestOptions).pipe(
      map(res => this.handleSuccess(res)),
      catchError(err => this.handleError(err)),
    );
  }

  public get(id): Observable<any> {
    const url = `${this.baseUrl}api/v1/users/${id}`;

    const requestOptions = this.getRequestOptions('application/json', 'application/json');

    return this.http.get(url, requestOptions).pipe(
      map(res => this.handleSuccess(res)),
      catchError(err => this.handleError(err)),
    );
  }

  public add(data: any): Observable<any> {
    const url = `${this.baseUrl}api/v1/users`;

    const requestOptions = this.getRequestOptions('application/json', 'application/json');

    return this.http.post(url, data, requestOptions).pipe(
      map(res => this.handleSuccess(res)),
      catchError(err => this.handleError(err)),
    );
  }

  public update(id: number, data: any): Observable<any> {
    const url = `${this.baseUrl}api/v1/users/${id}`;

    const requestOptions = this.getRequestOptions('application/json', 'application/json');

    return this.http.patch(url, data, requestOptions).pipe(
      map(res => this.handleSuccess(res)),
      catchError(err => this.handleError(err)),
    );
  }
}
