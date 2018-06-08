/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { Validate } from 'empiria';

import { Meeting } from '@app/models/project-management';
import { ProjectMeetingService } from '@app/services/project-management';


@Component({
    selector:'meetings',
    templateUrl: './project-meetings.component.html',
    styleUrls: ['./project-meetings.component.scss'],
    providers:[ProjectMeetingService]
})

export class MeetingsComponent implements OnInit  {

    public openedMeetings: Meeting[] = [];
    public closedMeetings: Meeting[] = [];

    public selectedMeetingUid = '';
    public filter = 'all';

    public keywords = '';

    public isOpenAddMeetingWindow = false;

    private _updatedMeeting: Meeting;;
    @Input()
    set updatedMeeting(updatedMeeting: Meeting) {
        if (Validate.hasValue(updatedMeeting)) {
            this._updatedMeeting = updatedMeeting;

            this.loadOpenedMeetings();
            this.loadClosedMeetings();
        }
    }
    get updatedMeeting(): Meeting {
        return this._updatedMeeting;
    }

    @Output() public onSelectedMeeting = new EventEmitter<string>();
    @Output() public onAddMeeting = new EventEmitter();

    constructor(private projectMeetingService: ProjectMeetingService) {}

    ngOnInit() {
        this.loadMeetings();
    }

    public onFilterBy(filter: string): void {
        this.filter = filter;
    }

    public onSelectMeeting(uid:string): void {
       this.selectedMeetingUid = uid;

       this.onSelectedMeeting.emit(uid);
    }

    public search(keywords: string): void {
        this.keywords = keywords;
        this.loadMeetings();
    }

    public addMeeting(): void {
        //this.isOpenAddMeetingWindow = true;
        this.onAddMeeting.emit();
    }

    private async loadMeetings() {
        await this.loadOpenedMeetings();
        this.loadClosedMeetings();
    }

    private loadOpenedMeetings(): void {
        this.projectMeetingService.getOpenedMeetings(this.keywords)
            .subscribe((meetings) => { this.openedMeetings = meetings; });
    }

    private loadClosedMeetings(): void {
        this.projectMeetingService.getMeetings(this.keywords)
            .subscribe((meetings) => {
                this.closedMeetings = meetings.filter(meeting => meeting.status === 'Closed');
             });
    }

}
