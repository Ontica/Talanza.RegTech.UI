import { TestBed, inject, async } from '@angular/core/testing';
import { HttpModule, Http } from '@angular/http';

import { HttpService } from './http.service';
import { DirectoryService } from './directory.service';

// describe('HttpService', () => {

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpModule],
//       providers: [HttpService, DirectoryService]
//     });
//   });

//   it('should return the license name', async(inject([HttpService], (httpService: HttpService) => {
//     const path = 'http://empiria.steps/api/' + 'v1/system/license';

//     httpService.get<string>(path)
//                .subscribe((value) => expect(value).toBe('COVAR') );

//   })));

// });
