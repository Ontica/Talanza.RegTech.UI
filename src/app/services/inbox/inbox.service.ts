/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CoreService } from '@app/core/core.service';

import { InboxFilter, InboxRef } from '@app/models/inbox';


@Injectable()
export class InboxService {

  public constructor(private core: CoreService) {}

  public getAllInboxItems(): Observable<InboxRef[]> {
    const path = `v1/inboxes/my-inbox`;

    return this.core.http.get<InboxRef[]>(path);
  }


  public getInboxItems(filter?: InboxFilter): Observable<InboxRef[]> {
    let filterAsString = '';

    if (filter instanceof InboxFilter) {
      filterAsString = '?' + filter.toString();
    }

    const path = `v1/inboxes/my-inbox${filterAsString}`;

    return this.core.http.get<InboxRef[]>(path)
  }

}
