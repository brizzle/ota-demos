import { HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export class BaseProxyService {
  public constructor() {}

  protected getRequestOptions(accept: string, contentType: string): any {
    const requestOptions = {
      params: new HttpParams(),
      headers: new HttpHeaders(),
    };

    requestOptions.headers = new HttpHeaders().set('Accept', accept).set('Content-Type', contentType);

    return requestOptions;
  }

  protected handleSuccess(response: any): Observable<any> {
    // console.log(response);
    console.log(response.data.data);
    return response.data.data;
  }

  protected handleError(err: Error | HttpErrorResponse): Observable<any> {
    console.log(`ERROR: ${JSON.stringify(err)}`);

    if (err instanceof HttpErrorResponse) {
      // Server-side error
      if (err.status === 401) {
        return throwError(`${err.error}`);
      } else if (err.status === 409) {
        return throwError(`${err.error}`);
      }

      return throwError(`${'There was a server-side error.'}`);
    }
    // Client-side error
    return throwError(err.message);
  }
}
