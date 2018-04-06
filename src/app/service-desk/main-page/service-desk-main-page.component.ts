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

    

    
    
}