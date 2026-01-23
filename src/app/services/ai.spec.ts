import { TestBed } from '@angular/core/testing';

import { AI } from './ai';

describe('AI', () => {
  let service: AI;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AI);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
