/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import  { Component } from '@angular/core';


@Component({
    selector:'meeting-report',
    templateUrl: './meeting-report.component.html',
    styleUrls: ['./meeting-report.component.scss']
})

export class MeetingReportComponent {  
    
    public selectedTask = "meetingData";

    public setSelectedTask(selectedTask: string): void {
        this.selectedTask = selectedTask;
    }
         
    
}
