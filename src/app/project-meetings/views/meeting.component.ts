import { Component, EventEmitter, Input, Output  } from '@angular/core';

import { Validate } from '@app/core';

import { Meeting, EmptyMeeting } from '@app/models/project-management';

import { ProjectMeetingService } from '@app/services/project-management';

@Component({
    selector: 'meeting',
    templateUrl: './meeting.component.html',
    styleUrls: ['./meeting.component.scss'],
    providers: [ProjectMeetingService]
})

export class MeetingComponent {

    private _meetingUID = '';
    @Input()
    set meetingUID(meetingUID: string) {
        if (Validate.hasValue(meetingUID)) {
            this._meetingUID = meetingUID;

            this.loadMeeting();
        }
    }
    get meetingUID(): string {
        return this._meetingUID;
    }

    @Output() onUpdateMeeting = new EventEmitter<Meeting>();

    meeting: Meeting = EmptyMeeting();
    meetingStatus = '';

    isOpenEditMeetingWindow = false;

    isEditableMeetingParticipants = true;

    constructor(private projectMeetingService: ProjectMeetingService) {}

    closeEditMeetingWindow(meeting: Meeting): void {
        this.isOpenEditMeetingWindow = false;

        this.meeting = meeting;

        this.onUpdateMeeting.emit(this.meeting);
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
                          .subscribe((meeting) => {
                              this.meeting = meeting;
                              this.setMeetingStatus();
                            });
    }

    private closeMeeting(): void {
        this.projectMeetingService.closeMeeting(this.meeting.uid)
                                  .subscribe((x) => {
                                        this.loadMeeting();
                                        this.isEditableMeetingParticipants = true;
                                        this.onUpdateMeeting.emit(this.meeting);
                                    });
    }

    private openMeeting(): void {
        this.projectMeetingService.openMeeting(this.meeting.uid)
                                  .subscribe((x) => {
                                      this.loadMeeting();
                                      this.onUpdateMeeting.emit(this.meeting);
                                    });
    }

    private deleteMeeting(): void {
        this.projectMeetingService.deleteMeeting(this.meeting.uid)
                                  .subscribe((x) => {
                                      this.meeting = x;
                                      this.onUpdateMeeting.emit(this.meeting);
                                   });
    }

}
