/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component } from '@angular/core';
import { Ticket, EmptyTicket } from '../data-types/ticket';
import { TicketService } from '../services/ticket.service';


 @Component({
     selector:'assistians',
     templateUrl:'./assistians.component.html',
     styleUrls: ['./assistians.component.scss']
 })

 export class AssistiansComponent {
    
    public assistiants: string[] = [];  
    public assistiant = "";

    public addAssistant(): void {      
        this.assistiants.push(this.assistiant);          
    }

 }