/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import  { Component, Input } from '@angular/core';
import { MeetingReport } from '../data-types/ticket';


@Component({
    selector:'project-meeting',
    templateUrl: './project-meeting.component.html',
    styleUrls: ['./project-meeting.component.scss']
})

export class ProjectMeetingComponent {  
    
    public selectedTask = "meetingData";
    public title = 'Agregar Reunión';

    private _meetingUID: string = "";
    @Input() 
    set meetingUID(meetingUID: string) {       
        this._meetingUID = meetingUID;        
    }
    get meetingUID(): string {
        return this._meetingUID;
    }

    public setSelectedTask(selectedTask: string): void {
        this.selectedTask = selectedTask;
    }

    public loadProjectMeeting(projectMeeting: any): void {
        this.title = projectMeeting.title;
    }
         
    
}
