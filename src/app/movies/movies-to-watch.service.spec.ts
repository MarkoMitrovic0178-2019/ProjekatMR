import { TestBed } from '@angular/core/testing';

import { MoviesToWatchService } from './movies-to-watch.service';

describe('MoviesToWatchService', () => {
  let service: MoviesToWatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviesToWatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
