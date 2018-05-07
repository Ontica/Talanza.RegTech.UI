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

    public isDrag = false;
    public dragIndex = 0;
    
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
    
    public onShowAddIntialTaskEditor(): void {
      this.hideAddTaskEditor();

      this.isAddInitialTask = true;
    }

    public hideAddIntialTaskEditor(): void {
      this.isAddInitialTask= false;
    }

   
    public addNewTask(PreviousActivityPosition: number, taskName: string): void {
      if (!taskName) {        
        return;
      }

      let position = PreviousActivityPosition + 1;
      
      let newActivity = {
        name: taskName,
        position: position,        
      }
      
      this.hideAddTaskEditor();
        
      this.activityService.addActivity(this.filter.project, newActivity)
          .subscribe((x) => { this.hideAddIntialTaskEditor();
                              this.hideAddTaskEditor();
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
                e.visible = 'none'
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
  
    public drop(ev: any, task: ActivityRef): void {
      ev.preventDefault();
      this.isDrag = false;
  
      var data = ev.dataTransfer.getData("data");
  
      this.moveActivity(JSON.parse(data), task);
    }
  
    public enableDrag(): void {
      this.isDrag = true;
    }
  
    private moveActivity(source: ActivityRef, target: ActivityRef): void {
      
      let position: number = 0;

      if (target.position > source.position) {
        position = target.position + 1;  
      } else {
        position = target.position;
      }                   
      
      this.activityService.moveActivity(source.project.uid, source.uid, position )
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
