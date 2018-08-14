import { TestBed, inject } from '@angular/core/testing';

import { FindZipService } from './find-zip.service';

describe('FindZipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FindZipService]
    });
  });

  it('should be created', inject([FindZipService], (service: FindZipService) => {
    expect(service).toBeTruthy();
  }));
});
