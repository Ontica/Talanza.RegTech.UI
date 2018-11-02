/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component } from '@angular/core';

import { ActivityService, ProjectService } from '@app/services/project-management';

import { InboxFilter } from '@app/models/inbox';


@Component({
  selector: 'inbox-main-page',
  templateUrl: './inbox-main-page.component.html',
  styleUrls: ['./inbox-main-page.component.scss'],
  providers: [ProjectService, ActivityService]
})
export class InboxMainPageComponent {

  public filter = new InboxFilter();

  public constructor(private projectService: ProjectService,
                     private activityService: ActivityService) { }


  public onChangeFilter(receivedFilter: InboxFilter) {
    this.filter = receivedFilter;
  }

}
