/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CoreService } from '../../core/core.service';

import { Faq } from '../data-types/faq';

export enum FAQsServiceErr {
  GET_FAQS_ERR =
        '[GET_FAQS_ERR] No pude leer la lista de FAQs.',
  GET_FAQ_ERR =
        '[GET_FAQ_ERR] Ocurrió un problema al leer la FAQ.',
  POST_ADDFAQ_ERR =
        '[POST_ADDFAQ_ERR] Ocurrió un problema al guardar la FAQ.',      
  PUT_FAQ_ERR =
        '[PUT_FAQ_ERR] Ocurrió un problema al actualizar la FAQ.',      
}


@Injectable()
export class FAQService {

    constructor(private core:CoreService) {}
  
    public getFAQs(keywords?: string): Observable<Faq[]> {     
     
      let path = `v1/knowledge-base/faqs/`;

      if (keywords) {
        path += `?keywords=${keywords}`;
     }
      
      return this.core.http
                    .get<Faq[]>(path)                  
                    .catch((e) => this.core.http.showAndReturn(e, FAQsServiceErr.GET_FAQS_ERR, null))
                  
    }    
  
    public getFAQ(uid: string): Observable<Faq> {     
     
      const path = `/v1/knowledge-base/faqs/${uid}`;
      
      return this.core.http
                    .get<Faq>(path)                  
                    .catch((e) => this.core.http.showAndReturn(e, FAQsServiceErr.GET_FAQ_ERR, null));               
    }
    
    public addFAQ(faq: Faq): Observable<any> {    

      return this.core.http.post<any>
                  ('v1/knowledge-base/faqs', faq)
                  .catch((e) => this.core.http.showAndReturn(e, FAQsServiceErr.POST_ADDFAQ_ERR, null));                    
                              
    }

    public updateFAQ(faq: Faq): Observable<any> {    

      return this.core.http.put<any>
                  (`v1/knowledge-base/faqs/${faq.uid}`, faq,)
                  .catch((e) => this.core.http.showAndReturn(e, FAQsServiceErr.PUT_FAQ_ERR, null));                    
                              
    }

    
   
    
}
