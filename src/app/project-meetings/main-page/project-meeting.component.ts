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

    private _ticketUID: string = "";
    @Input() 
    set ticketUID(ticketUID: string) {       
        this._ticketUID = ticketUID;        
    }
    get ticketUID(): string {
        return this._ticketUID;
    }

    public setSelectedTask(selectedTask: string): void {
        this.selectedTask = selectedTask;
    }

    public loadProjectMeeting(projectMeeting: any): void {
        this.title = projectMeeting.title;
    }
         
    
}
