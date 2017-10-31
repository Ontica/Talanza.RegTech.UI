/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, OnInit } from '@angular/core';

import { EmptyProjectRef, PersonRef, ProjectRef, ResourceRef } from '../data-types/project';
import { ActivityFilter } from '../data-types/activity-filter';
import { ActivityRef } from '../data-types/activity';

import { ProjectService } from '../services/project.service';
import { ActivityService } from '../services/activity.service';


@Component({
  selector: 'projects-main-page',
  templateUrl: './projects-main-page.component.html',
  styleUrls: ['./projects-main-page.component.scss'],
  providers: [ProjectService, ActivityService]
})

export class ProjectsMainPageComponent implements OnInit {
  
  public isAddActivityVisible = false;

  public selectedProject: ProjectRef = EmptyProjectRef();

  public selectedView = 'work-list';
  public ganttConfig = 'ganttWeeks';
  public selectedScale = 'quarters';
 
  public taskList: ActivityRef[] = [];

  public isRefreshWorkList = false;

  public filter: ActivityFilter = new ActivityFilter();
  
  public constructor(private projectService: ProjectService, private activityService: ActivityService) { }

  public ngOnInit() {
   
  }


  public  onChangeFilter(receivedFilter: ActivityFilter) {    
    this.filter = receivedFilter;     
  }
  
  public onChangeDislpayFilter(displayFilter: any): void {
    this.selectedView = displayFilter.selectedView;
    this.selectedScale = displayFilter.selectedScale;   
  }

 public setAddActivityVisible(isAddActivityVisible: boolean): void {  
   this.isAddActivityVisible = isAddActivityVisible;
 }
   
}
