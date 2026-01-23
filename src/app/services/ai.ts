import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AIService {
  private http = inject(HttpClient);
  private analyzeUrl = `${environment.apiUrl}/ai/analyze`;
  private baseUrl = `${environment.apiUrl}/ai`;

  analyzeError(logContent: string): Observable<{ analysis: string }> {
    return this.http.post<{ analysis: string }>(this.analyzeUrl, { logContent });
  }

  saveAnalysis(logId: string, analysis: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/logs/${logId}/save`, { analysis });
  }
}
