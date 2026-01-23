import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageResponse, ServerLog } from '../models/ServerLog';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/logs`;

  getLogs(page: number, size: number): Observable<PageResponse<ServerLog>> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());

    return this.http.get<PageResponse<ServerLog>>(this.apiUrl, { params });
  }
}
