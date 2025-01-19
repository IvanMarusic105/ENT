import { TestBed } from '@angular/core/testing';

import { BoardServicesTsService } from './board.services.ts.service';

describe('BoardServicesTsService', () => {
  let service: BoardServicesTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardServicesTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
