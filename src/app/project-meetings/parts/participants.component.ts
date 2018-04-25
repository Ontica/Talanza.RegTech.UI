/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, Input } from '@angular/core';

import { Participant, EmptyParticipant } from '../data-types/meeting';
import { ProjectMeetingService } from '../services/project-meeting.service';


 @Component({
     selector:'participants',
     templateUrl:'./participants.component.html',
     styleUrls: ['./participants.component.scss'],
     providers: [ProjectMeetingService] 
 })

 export class ParticipantsComponent  {
 
    public participantsAviable: Participant[] = [];    
    public participants: Participant[] = [];
    public selectedParticipantUID:  string = "";
    public isAddParticipantEditorVisible = false;
    public newParticipant = EmptyParticipant(); 

    private _meetingUID = '';
    @Input()  
    set meetingUID(meetingUID: string) {
        if (meetingUID === '') {
            return;
        }

        this._meetingUID = meetingUID;

        this.loadInitialValues();
    }
    get meetingUID(): string {
        return this._meetingUID;
    }

    private _isReadOnly: boolean = false;
    @Input()
    set isReadOnly(isReadOnly: boolean) {
        this._isReadOnly = isReadOnly;       
    }
    get isReadOnly(): boolean {
        return this._isReadOnly;
    }

    constructor(private projectMeetingService: ProjectMeetingService) {}
   
    public onSelectedParticipant(selectedParticipantUID:string): void {
      if (this.selectedParticipantUID === 'addParticipant') {
          this.isAddParticipantEditorVisible = true;
          return;
      }

      this.isAddParticipantEditorVisible = false;

      this.selectedParticipantUID = selectedParticipantUID;      
    }

    public addParticipantToMeeting(): void {
        
        if (this.selectedParticipantUID === '') {
            return;
        } 
        
        this.projectMeetingService.addParticipantToMeeting(this.meetingUID, this.selectedParticipantUID)
            .subscribe((x) => { this.participants = x.participants;
                                this.refreshParticipantsAviable();
                              });
    }

    public addParticipant(): void {
        if (!this.validateParticipant()) {
            return;
        }

        this.selectedParticipantUID = ''

        this.isAddParticipantEditorVisible = false;
    }

    private loadInitialValues(): void {
        this.loadParticipantsAvailable();
        this.loadParticipants();
    }

    private loadParticipantsAvailable(): void  {        
        this.projectMeetingService.getParticipantAvailable(this.meetingUID)
            .subscribe((x) => { this.participantsAviable = x; });                
    }

    private loadParticipants(): void {
        this.projectMeetingService.getMeeting(this.meetingUID)
            .subscribe((x) => { this.participants = x.participants;})
    }

    private onDeleteParticipantFromMeeting(participantUID: string): void {
        this.projectMeetingService.deleteParticipantFromMeeting(this.meetingUID, participantUID)
            .subscribe((x) => { this.participants = x.participants;
                                this.refreshParticipantsAviable(); 
                            })
    }

    private refreshParticipantsAviable() {
        this.loadParticipantsAvailable();
        this.selectedParticipantUID = '';
    }

    private validateParticipant(): boolean {
        if (this.newParticipant.shortName === '') {
            alert("El nombre corto del participante se encuentra en blanco");
            return false;
        }
        if (this.newParticipant.email === '') {
            alert("El correo elctrónico del participante se encuentra en blanco");
            return false;
        }

        return true;
    }

 }