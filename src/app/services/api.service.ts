import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  /**
   * Promise wrapper for `get()` method of `HttpClient`.
   * @param url The endpoint URL.
   */
  async get<T>(url: string): Promise<any> {
    const promise: Promise<T> = lastValueFrom(this.http.get<T>(url));

    return promise.catch((error: HttpErrorResponse) => {
      return Promise.reject(error.error);
    });
  }
}
