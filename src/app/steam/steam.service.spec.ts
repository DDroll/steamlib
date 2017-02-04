/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SteamService } from './steam.service';

describe('Service: Steam', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SteamService]
    });
  });

  it('should ...', inject([SteamService], (service: SteamService) => {
    expect(service).toBeTruthy();
  }));
});
