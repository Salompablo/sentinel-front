import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { AIService } from './ai';
import { environment } from '../environments/environment';

describe('AIService', () => {
  let service: AIService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AIService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('analyzeError should POST the log content to /ai/analyze', () => {
    let result: { analysis: string } | undefined;

    service.analyzeError('NullPointerException').subscribe((res) => (result = res));

    const req = httpMock.expectOne(`${environment.apiUrl}/ai/analyze`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ logContent: 'NullPointerException' });

    req.flush({ analysis: 'Null reference in service layer' });
    expect(result).toEqual({ analysis: 'Null reference in service layer' });
  });

  it('saveAnalysis should PATCH the analysis to /ai/logs/{id}/save', () => {
    service.saveAnalysis('log-42', 'some analysis').subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/ai/logs/log-42/save`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ analysis: 'some analysis' });

    req.flush({});
  });
});
