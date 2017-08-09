/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { Component, EventEmitter, HostBinding, Output, OnInit} from '@angular/core';
declare var dhtmlXCalendarObject: any;

@Component({
  selector: 'project-add-activity',
  templateUrl: './project-add-activity.component.html',
  styleUrls: ['./project-add-activity.component.scss']
})

export class ProjectAddActivityComponent implements OnInit {

  @HostBinding('style.display') public display = 'block';
  @HostBinding('style.position') public position = 'absolute';
  @Output() public onCloseEvent = new EventEmitter();

  public date = '';  
  private requestedDateCalendar: any;
  private startDateCalendar: any;
  private endDateCalendar: any;

  ngOnInit() {     
    this.requestedDateCalendar = new dhtmlXCalendarObject({input:"requestedDateCalendar",button:"requestedDateButton"});
    this.startDateCalendar = new dhtmlXCalendarObject({input:"startDateCalendar",button:"startDateCalendarButton"});
    this.endDateCalendar = new dhtmlXCalendarObject({input:"endDateCalendar",button:"endDateCalendarButton"});
  }

  public onClose(): void {
    this.onCloseEvent.emit();
  }

  public onClickCancel(): void {  
    this.onClose();    
  }

  

}