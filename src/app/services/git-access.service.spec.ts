import { TestBed } from '@angular/core/testing';

import { GitAccessService } from './git-access.service';

describe('GitAccessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GitAccessService = TestBed.get(GitAccessService);
    expect(service).toBeTruthy();
  });
});
