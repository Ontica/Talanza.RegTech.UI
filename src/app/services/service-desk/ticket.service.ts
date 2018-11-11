/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CoreService } from '@app/core/core.service';

import { Ticket } from '@app/models/service-desk';


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

  constructor(private core: CoreService) { }


  getTicketsOpened(keywords?: string): Observable<Ticket[]> {
    let path = `v1/help-desk/tickets/opened/`;

    if (keywords) {
      path += `?keywords=${keywords}`;
    }

    return this.core.http.get<Ticket[]>(path)
      .pipe(
        catchError((e) => this.core.http.showAndReturn(e, TicketServiceErr.GET_TICKETS_OPENEND_ERR, null))
      );
  }


  getTicket(ticketUID): Observable<Ticket> {
    const path = `v1/help-desk/tickets/${ticketUID}`;

    return this.core.http.get<Ticket[]>(path)
      .pipe(
        catchError((e) => this.core.http.showAndReturn(e, TicketServiceErr.GET_TICKET_ERR, null))
      );
  }


  addTicket(ticket: Ticket) {
    const path = `v1/help-desk/tickets`;

    return this.core.http.post<any>(path, ticket)
      .pipe(
        catchError((e) => this.core.http.showAndReturn(e, TicketServiceErr.POST_TICKET_ERR, null))
      );
  }


  getTicketsClosed(keywords?: string): Observable<Ticket[]> {
    let path = `v1/service-desk/tickets/opened/`;

    if (keywords) {
      path += `?keywords=${keywords}`;
    }

    return this.core.http.get<Ticket[]>(path)
      .pipe(
        catchError((e) => this.core.http.showAndReturn(e, TicketServiceErr.GET_TICKETS_CLOSED_ERR, null))
      );
  }

}
