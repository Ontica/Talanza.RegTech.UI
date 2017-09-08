import { Component, Input } from '@angular/core';

export interface ProjectRef {
  uid: string;
  name: string;
}

@Component({
  selector:'gantt-view',
  template:`<div class="container" [ngStyle]="{'height': + height +'px'}">
          <gantt [project]="selectedProject " [config]="ganttConfig "></gantt>
          </div>`,
          
  styles:[`.container {    
    overflow-y:auto;
    background-color: white;
  }`]
})

export class GanttViewComponent {
  
 public ganttConfig = 'ganttWeeks';
 public selectedProject: ProjectRef = {
   uid: 'abc345klo',
   name: 'Sierra Cuenca Salina A4'
  }
  private _height: number = 0;
  @Input() 
  set height(height: number) {
    this._height = height;            
  }
  get height(): number {        
      return this._height;
  }

}