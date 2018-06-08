/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component } from '@angular/core';

import { InboxFilter } from '../data-types/inbox-filter';
import { Activity } from '../../project-management/data-types/activity';

import { ActivityService, ProjectService } from '../../services/project-management';

@Component({
  selector: 'inbox-main-page',
  templateUrl: './inbox-main-page.component.html',
  styleUrls: ['./inbox-main-page.component.scss'],
  providers: [ProjectService, ActivityService]
})

export class InboxMainPageComponent  {

  public filter: InboxFilter = new InboxFilter();

  public constructor(private projectService: ProjectService, private activityService: ActivityService) { }

  public  onChangeFilter(receivedFilter: InboxFilter) {
    this.filter = receivedFilter;
  }

}
