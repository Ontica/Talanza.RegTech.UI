/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import  { Component } from '@angular/core';


@Component({
    selector:'project-meeting',
    templateUrl: './project-meeting.component.html',
    styleUrls: ['./project-meeting.component.scss']
})

export class ProjectMeetingComponent {  
    
    public selectedTask = "meetingData";

    public setSelectedTask(selectedTask: string): void {
        this.selectedTask = selectedTask;
    }
         
    
}
