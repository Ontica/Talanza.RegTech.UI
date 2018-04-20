/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { Meeting, EmptyMeeting } from '../data-types/meeting';
import { ProjectMeetingService } from '../services/project-meeting.service';


import { ProjectService } from '../../project-management/services/project.service';

@Component({
    selector: 'meeting-data',
    templateUrl: './meeting-data.component.html',
    styleUrls: ['./meeting-data.component.scss'],
    providers:[ProjectMeetingService, ProjectMeetingService]
})

export class MeetingDataComponent implements OnInit {
    
    public meeting = EmptyMeeting();
    public isMeetingData = false;
    
    public projects: any[] = [];

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

    constructor(private projectMeetingService: ProjectMeetingService, 
                private projectService: ProjectService) {}
    
    ngOnInit() {
        this.loadProjectsList();
    }
    public async doOperation() {
        if (!this.validate()) {
            return;
        }

        if (this.meetingUID === '') {
            await this.saveMeetingData();
        } else {
            this.updateMeeting();
        }
        
        
        this.isMeetingData = true;
        
    }
    
    public cancel() {
        this.loadMeeting();
        this.onLoadProjectMeeting.emit(this.meeting); 
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
                          .subscribe((x) => {  this.onLoadProjectMeeting.emit(x);
                                               this.isMeetingData = true;                                                
                                            });           
    }
    
    private async loadMeeting() {
        this.projectMeetingService.getMeeting(this.meetingUID)
                          .subscribe((x)=> { this.meeting = x;
                          });
    }

    private updateMeeting() {       
        this.projectMeetingService.updateMeeting(this.meeting)
                          .subscribe((x)=> {
                                             this.onLoadProjectMeeting.emit(x);
                           });                    
    }

    private loadProjectsList() {
      const error = 'Ocurrió un problema al leer la lista de proyectos.';
      
       this.projectService.getProjectList()
                .subscribe((x) => { this.projects =x;}  ,
                            () => { alert(error);});
    }

}
