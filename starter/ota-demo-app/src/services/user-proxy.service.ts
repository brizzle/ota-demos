import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BaseProxyService } from './base-proxy.service';

@Injectable()
export class UserProxyService extends BaseProxyService {
  public constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    super();
  }

  public getAll(): Observable<any> {
    const url = `${this.baseUrl}api/v1/users`;

    const requestOptions = this.getRequestOptions(
      'application/json',
      'application/json'
    );

    return this.http.get(url, requestOptions).pipe(
      map(res => this.handleSuccess(res)),
      catchError(err => this.handleError(err))
    );
  }
}
