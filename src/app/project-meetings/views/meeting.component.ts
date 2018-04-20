import { Component, EventEmitter, Input, Output  } from '@angular/core';

import { Meeting } from '../data-types/meeting';

import { ProjectMeetingService } from '../services/project-meeting.service';

@Component({
    selector: 'meeting',
    templateUrl: './meeting.component.html',
    styleUrls: ['./meeting.component.scss'],
    providers: [ProjectMeetingService]
})

export class MeetingComponent {

    private _meetingUID: string = '';
    @Input() 
    set meetingUID(meetingUID: string) {
        this._meetingUID = meetingUID;

        this.loadMeeting();
    }
    get meetingUID(): string {
        return this._meetingUID;
    }

    public meeting: Meeting;
    public meetingStatus = '';

    public isOpenEditMeetingWindow = false;

    constructor(private projectMeetingService: ProjectMeetingService) {}

    public closeEditMeetingWindow(): void {
        this.isOpenEditMeetingWindow = true;

        this.openMeeting();
    }

    private setMeetingStatus(): void {
        if (this.meeting.status === 'Opened') {
            this.meetingStatus = 'Abierta';
        } else {
            this.meetingStatus = 'Cerrada';
        }
    }

    private loadMeeting() {
        this.projectMeetingService.getMeeting(this.meetingUID)
                          .subscribe((meeting)=> { 
                              this.meeting = meeting; 
                              this.setMeetingStatus();                        
                            });
    }    

    private closeMeeting(): void {
        this.projectMeetingService.closeMeeting(this.meeting.uid)
                                  .subscribe((x)=> {
                                        this.loadMeeting();                                     
                                    })
    }

    private openMeeting(): void {
        this.projectMeetingService.openMeeting(this.meeting.uid)
                                  .subscribe((x)=> {
                                      this.loadMeeting();                                      
                                    })
    }

    private deleteMeeting(): void {
        this.projectMeetingService.deleteMeeting(this.meeting.uid)
                                  .subscribe((x)=>{});
    }

}
