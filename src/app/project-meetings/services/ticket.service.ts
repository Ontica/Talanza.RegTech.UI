/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { CoreService } from '../../core/core.service';

import { Ticket } from '../data-types/ticket';

export enum TicketServiceErr {
  GET_TICKETS_OPENEND_ERR =
        '[GET_TICKETS_OPENEND_ERR] No pude leer los tickets abiertos.',
  GET_TICKETS_CLOSED_ERR =
        '[GET_TICKETS_CLOSED_ERR] Ocurrió un problema al leer los tickets cerrados.',
  POST_TICKET_ERR =
        '[POST_TICKET_ERR] Ocurrió un problema al guardar el ticket.',
  GET_TICKET_ERR =
        '[GET_TICKET_ERR] Ocurrió un problema al leer el ticket.',      
  
}

@Injectable()
export class TicketService {
    constructor(private core:CoreService) {}
  
    public getTicketsOpened(keywords?: string): Observable<Ticket[]> {     
      
      let path = `v1/help-desk/tickets/opened/`;

      if (keywords) {
         path += `?keywords=${keywords}`;
      }  
          
      return this.core.http
                 .get<Ticket[]>(path)                  
                 .catch((e) => this.core.http.showAndReturn(e, TicketServiceErr.GET_TICKETS_OPENEND_ERR, null)) 
    
    }
    
    public getTicket(ticketUID: string): Observable<Ticket> {
      let path = `v1/help-desk/tickets/${ticketUID}`;     
          
      return this.core.http
                 .get<Ticket[]>(path)                  
                 .catch((e) => this.core.http.showAndReturn(e, TicketServiceErr.GET_TICKET_ERR, null)) 
    }

    public addTicket(ticket: Ticket) {
      let path = `v1/help-desk/tickets`;

      return this.core.http
                      .post<any>(path, ticket)
                      .catch((e) => 
                              this.core.http.showAndReturn(e,TicketServiceErr.POST_TICKET_ERR, null));
    }

    public getTicketsClosed(keywords?: string): Observable<Ticket[]> {     
     
      let path = `v1/service-desk/tickets/opened/`;

      if (keywords) {
         path += `?keywords=${keywords}`;
      } 
          
      return this.core.http
                 .get<Ticket[]>(path)                  
                 .catch((e) => this.core.http.showAndReturn(e, TicketServiceErr.GET_TICKETS_CLOSED_ERR, null)) 
    
    }  
    
}
