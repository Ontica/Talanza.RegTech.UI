import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ActivityRef, EmptyActivityRef } from '../../data-types/activity';
import { EmptyActivity } from '../../data-types/project';
import { ActivityFilter } from '../../data-types/activity-filter';

import { ActivityService } from '../../services/activity.service';


@Component({
    selector: 'activity-list',
    templateUrl: './activity-list.component.html',
    styleUrls: ['./activity-list.component.scss'],
    providers:[ ActivityService]
})

export class ActivityListComponent {
  
    public isAddTask = false;
    public taskList: ActivityRef[] = [];

    public expanOrCollapseIcon = 'fa fa-minus-circle';

    public selectedTaskUID = '';

    public isAddInitialTask = false;
    public isAddBrotherTask = false;

    public isDrag = false;
        
    private _filter : ActivityFilter = new ActivityFilter();
    @Input() 
    set filter(filter: ActivityFilter) {
        if ((filter)) {
            this._filter = filter;
            
            this.refreshData();
        }
        
    }
    get filter(): ActivityFilter {
        return this._filter;
    }
    
    @Output() public onSelectedTask = new EventEmitter<ActivityRef>();

    constructor (private activityService: ActivityService){}

    public onSelectTask(task: ActivityRef): void {
        this.selectedTaskUID = task.uid;
        
        this.onSelectedTask.emit(task);
    }

    public onShowAddTaskEditor(taskUID: string): void { 
      this.hideAddIntialTaskEditor(); 

      this.selectedTaskUID = taskUID;
          
      this.isAddTask = !this.isAddTask;      
    }

    public hideAddTaskEditor(): void {
      this.isAddTask = false;  
    }

    public hideAddTaskInPositionEditor(): void {
      this.isAddBrotherTask = false;
    }
    
    public onShowAddIntialTaskEditor(): void { 
      if (this.selectedTaskUID === '') {
        this.isAddInitialTask = true;
      } else {
        this.isAddBrotherTask = true;      
      }
      
      this.hideAddTaskEditor();      
    }

    public hideAddIntialTaskEditor(): void {
      this.isAddInitialTask= false;
    }
        
    public addNewTaskInPosition(position: number, taskName:string) {
      if (!taskName) {        
        return;
      }

      position = position + 1;

      let newActivity = {
        name: taskName,
        position: position
      }

      this.activityService.addActivity(this.filter.project, newActivity)
      .subscribe((x) => { this.hideAddIntialTaskEditor();                        
                          this.isAddBrotherTask = false;
                          this.refreshData();
                        }); 
    }
   
    public addNewTask(parentTask: ActivityRef, taskName: string ): void {
      if (!taskName) {        
        return;
      }

      let position = parentTask.position + 1;
      
      let newActivity = {
        name: taskName,
        position: position,
        parentUID: parentTask.uid        
      }
        
      this.hideAddTaskEditor();
        
      this.activityService.addActivity(this.filter.project, newActivity)
          .subscribe((x) => { this.hideAddTaskEditor();
                              this.refreshData();
                            }); 
      
      
    }
    
    public deleteTask(taskUID: string): void {
      if (!taskUID) {       
        return;
      }  

      this.activityService.deleteActivity(this.filter.project, taskUID)
          .subscribe((x) => { this.refreshData();});
    }

    public expandOrCollapse(parentUID: string): void {
        let index = this.taskList.findIndex((e) => e.parent.uid === parentUID) - 1;
    
        if (this.taskList[index].visible === 'collapse') {
          this.taskList[index].visible = 'expand';
          this.changeExpandOrCollapseIcon('visible');
          this.changeVisibility(parentUID, 'visible')
        } else {
          this.taskList[index].visible = 'collapse';
          this.changeExpandOrCollapseIcon('collapse');
          this.changeVisibility(parentUID, 'none');
        }
    
    }

    private changeExpandOrCollapseIcon(changeVisibility: string) {
        if (changeVisibility === 'collapse') {
          this.expanOrCollapseIcon = 'fa fa-plus-circle';
        } else {
          this.expanOrCollapseIcon = 'fa fa-minus-circle';
        }
    }

    private changeVisibility(parentUID, visibibility: string): void {
        this.taskList.forEach((e) => {
          if (e.parent.uid === parentUID) {
            if (e.type === 'ObjectType.ProjectItem.Summary') {
              this.changeVisibility(e.uid, visibibility);
            }
            e.visible = visibibility;
          }
        });
      }

    public setSummaryCSSClass(level: number): string {        
        switch (level) {
          case -1:
            return 'no-summary';
    
          case 1:
            return 'summary-level1';
    
          case 2:
            return 'summary-level2';
    
          case 3:
            return 'summary-level3';
    
          default:
            return 'summary-level3';
        }
    
      }
    
    private async refreshData() {
      if (this.filter.project === ''){
        return;
      }
        await this.activityService.getActivities(this.filter.project)
          .then((data) => {
            
            this.taskList = data;
           
            this.taskList.forEach(function (e) {
              if (e.type === 'ObjectType.ProjectItem.Summary') {
                e.visible = 'collapse'
    
              } else if (e.type === 'ObjectType.ProjectItem.Activity' &&
                e.parent.uid === 'Empty') {
                e.visible = 'visible'
    
                } else {
                e.visible = 'visible'; //'none'
              }
            });
        });
    }
    
    public allowDrop(ev: any): void {
      if (!this.isDrag) {
        return;
      }
      
      ev.preventDefault();
    }
  
    public drag(ev: any, data: any): void {      
      ev.dataTransfer.setData("data", JSON.stringify(data));      
    }

    public enableDrag(): void {
      this.isDrag = true;
    }

    public getSourceActivity(ev:any): ActivityRef {      
      ev.preventDefault();

      this.isDrag = false;
  
      let activity = JSON.parse(ev.dataTransfer.getData("data"));
     
      return activity;
    }
   
    public moveActivityUp(ev:any, targetPosition: number): void {
      
      let sourceActivity = this.getSourceActivity(ev);  
             
      this.setNewPositionToActivity(sourceActivity, targetPosition);
    }

    public moveActivityDown(ev:any, targetPosition: number): void {
      
      let sourceActivity = this.getSourceActivity(ev);

      let position = targetPosition + 1;  
        
      this.setNewPositionToActivity(sourceActivity, position);
    }  
    
    public setActicityAsDaughter(ev:any, parentUID: string): void {
      let sourceActivity = this.getSourceActivity(ev);

      this.setNewParentToActivity(sourceActivity, parentUID);
    }     

    private setNewPositionToActivity(sourceActivity: ActivityRef, position: number): void {              
      
      this.activityService.setNewPositionToActivity(sourceActivity.project.uid, sourceActivity.uid, position)
        .subscribe((x) => {
          this.reloadActivities();             
      });
    }

    private setNewParentToActivity(sourceActivity: ActivityRef, parentUID: string): void { 
      
      this.activityService.setNewParentToActivity(sourceActivity.project.uid, sourceActivity.uid, parentUID )
        .subscribe((x) => {
          this.reloadActivities();                  
       });
    }

    private reloadActivities(): void {

      this.activityService.getActivities(this.filter.project)
      .then((data) => {   
        let taskList = data;            
          
        taskList.forEach((e) => {
            let index = this.taskList.findIndex((x) => x.uid === e.uid);
            e.visible = this.taskList[index].visible;   
        });

       this.taskList = taskList; 
    });

  }
  
      
}
