/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Output, OnInit } from '@angular/core';

import { TicketService } from '@app/services/service-desk';

import { Ticket } from '@app/models/service-desk';


@Component({
  selector: 'tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
  providers: [TicketService]
})
export class TicketsComponent implements OnInit {

  public ticketsOpened: Ticket[] = [];
  public ticketsClosed: Ticket[] = [];

  public selectedTicketUid = '';
  public filter = 'all';

  public keywords = '';

  @Output() public onSelectedTicket = new EventEmitter<string>();

  constructor(private ticketService: TicketService) { }

  ngOnInit() {
    this.loadTickets();
  }

  public onFilterBy(filter: string): void {
    this.filter = filter;
  }


  public onSelectTicket(uid: string): void {
    this.selectedTicketUid = uid;

    this.onSelectedTicket.emit(uid);
  }


  public search(keywords: string): void {
    this.keywords = keywords;
    this.loadTickets();
  }


  private async loadTickets() {
    await this.loadOpenTickets();
  }


  private loadOpenTickets(): void {
    this.ticketService.getTicketsOpened(this.keywords)
      .subscribe((tickets) => { this.ticketsOpened = tickets; });
  }


  private loadClosedTickets(): void {
    this.ticketService.getTicketsClosed(this.keywords)
      .subscribe((tickets) => { this.ticketsClosed = tickets; });
  }

}
