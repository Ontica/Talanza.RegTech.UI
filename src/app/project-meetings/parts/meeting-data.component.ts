/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Meeting, EmptyMeeting } from '../data-types/meeting';
import { ProjectMeetingService } from '../services/project-meeting.service';

@Component({
    selector: 'meeting-data',
    templateUrl: './meeting-data.component.html',
    styleUrls: ['./meeting-data.component.scss'],
    providers:[ProjectMeetingService]
})

export class MeetingDataComponent {
    
    public meeting = EmptyMeeting();
    public isMeetingData = false;


    private _meetingUID: string = "";
    @Input() 
    set meetingUID(meetingUID: string) {
        this._meetingUID = meetingUID;       
       if ((meetingUID === '') || (meetingUID === undefined) || (!meetingUID)) {
            return;
       }
       this.loadMeeting();
       
    }
    get meetingUID(): string {
        return this._meetingUID;
    }

    @Output() onLoadProjectMeeting = new EventEmitter<Meeting>();

    constructor(private projectMeetingService: ProjectMeetingService) {}

    public async addMeetingData() {
        if (!this.validate()) {
            return;
        }

        await this.saveMeetingData();
        
        this.isMeetingData = true;
        
    }    

    private validate(): boolean {
        if (this.meeting.title === '') {
            alert("El nombre de la reunión se encuentra en blanco");
            return false;
        }
        return true;
    }
    
    private async saveMeetingData() {
      await  this.projectMeetingService.addMeeting(this.meeting)
                          .subscribe((x) => {  this.isMeetingData = true;
                                               this.onLoadProjectMeeting.emit(x); 
                                            });           
    }
    
    private async loadMeeting() {
        this.projectMeetingService.getMeeting(this.meetingUID)
                          .subscribe((x)=> { this.meeting = x;
                                             this.onLoadProjectMeeting.emit(x);
                                           });
    }

}