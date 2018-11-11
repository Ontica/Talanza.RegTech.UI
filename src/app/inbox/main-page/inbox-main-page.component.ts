/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component } from '@angular/core';

import { InboxFilter } from '@app/models/inbox';


@Component({
  selector: 'emp-steps-inbox-main-page',
  templateUrl: './inbox-main-page.component.html',
  styleUrls: ['./inbox-main-page.component.scss']
})
export class InboxMainPageComponent {

  filter = new InboxFilter();

  onChangeFilter(receivedFilter: InboxFilter) {
    this.filter = receivedFilter;
  }

}
