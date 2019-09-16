import { TestBed } from '@angular/core/testing';

import { PublicGitService } from './public-git.service';

describe('PublicGitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PublicGitService = TestBed.get(PublicGitService);
    expect(service).toBeTruthy();
  });
});
