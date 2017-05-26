import { TestBed, inject, async } from '@angular/core/testing';
import { HttpModule, Http } from '@angular/http';

import { DirectoryService } from './directory.service';
import { HttpMethod } from './common-types';

describe('DirectoryService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [DirectoryService]
    });
  });

  it('should get a service', async(

    inject([DirectoryService], (directory: DirectoryService) => {
      directory.getService('System.GetLicense')
               .subscribe((value) => expect(value.path).toBe('v1/system/license'));

    })));

});
