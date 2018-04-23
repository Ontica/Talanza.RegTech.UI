import { Component } from '@angular/core';

@Component({
    selector:'service-desk',
    templateUrl: './service-desk-main-page.component.html',
    styleUrls: ['./service-desk-main-page.component.scss']
})

export class ServiceDeskMainPageComponent {

    public selectedTask: string = 'ticket';
    public keywords: string = '';
    public isDisplayFaq = false
   
    public FAQUid = '';

    public selectedTicketUID = '';

    public meetingUpdated: any;

    public onAddMeeting = false;

    public setSelectedTask(selectedTask: string): void {
        this.selectedTask = selectedTask; 
        this.FAQUid = '';
        this.isDisplayFaq = false;   
    }

    public search(keywords: string): void {
        this.keywords = keywords;        
    }

    public setSelectedFAQ(uid: string): void {
        this.FAQUid = uid;
        this.isDisplayFaq = true;
        
    }

    public notifyMeetingWasUpdate(meeting: any): void {        
        this.meetingUpdated = meeting;
        
    }

    public addMeeting(): void {
        this.selectedTicketUID = '';
        this.onAddMeeting = true;
    }

    public selectedMeeting(meetingUID: string): void {
        this.selectedTicketUID = meetingUID;
        this.onAddMeeting = false;
    }


        
    
}