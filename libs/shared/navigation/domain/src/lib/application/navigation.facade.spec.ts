import { TestBed } from '@angular/core/testing';

import { NavigationFacade } from './navigation.facade';

describe('NavigationFacadeService', () => {
  let service: NavigationFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavigationFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
