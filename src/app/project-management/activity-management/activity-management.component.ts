import { Component, Input } from '@angular/core';

import { ActivityRef, EmptyActivityRef } from '../data-types/activity'; 
import { ActivityFilter } from '../data-types/activity-filter';

@Component({
    selector:'activity-management',
    templateUrl: './activity-management.component.html',
    styleUrls: ['./activity-management.component.scss']
})

export class ActivityManagementComponent {

    public masterContainer = 'centered-container';  
    
    public isDetailsContainerVisible = false;
    
    public selectedTask = EmptyActivityRef();
   
    private _filter : ActivityFilter = new ActivityFilter();
    @Input() 
    set filter(filter: ActivityFilter) {
        if (filter) {
            this._filter = filter;           
        }        
    }
    get filter(): ActivityFilter {
        return this._filter;
    }

    public displayTaskEditor(task: ActivityRef): void {        
        if (task) {            
            this.selectedTask = task;
           
            this.showDetailsContainer();
        }
    }

    public closeDetailsContainer(): void {      
        this.masterContainer = 'centered-container';
        this.isDetailsContainerVisible = false;        
    }

    private showDetailsContainer(): void {
        this.masterContainer = 'block-container';
        this.isDetailsContainerVisible = true;   
    }

    p
}