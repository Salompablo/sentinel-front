import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { LogService } from './log';
import { PageResponse, ServerLog } from '../models/ServerLog';
import { environment } from '../environments/environment';

describe('LogService', () => {
  let service: LogService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(LogService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getLogs should GET /logs with page and size as query params', () => {
    const page: PageResponse<ServerLog> = {
      content: [
        {
          id: '1',
          serverId: 7,
          serverName: 'srv-1',
          region: 'us-east',
          errorType: 'ERROR',
          content: 'boom',
          timestamp: '2026-01-01T00:00:00Z',
        },
      ],
      totalPages: 3,
      totalElements: 25,
      size: 10,
      number: 2,
    };
    let result: PageResponse<ServerLog> | undefined;

    service.getLogs(2, 10).subscribe((res) => (result = res));

    const req = httpMock.expectOne((r) => r.url === `${environment.apiUrl}/logs`);
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('page')).toBe('2');
    expect(req.request.params.get('size')).toBe('10');

    req.flush(page);
    expect(result).toEqual(page);
  });
});
