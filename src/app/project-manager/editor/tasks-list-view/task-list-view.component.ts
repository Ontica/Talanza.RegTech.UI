import { Component, Input } from '@angular/core';

@Component({
  selector:'tasks-list-view',
  templateUrl:'./task-list-view.component.html',
  styleUrls: ['./task-list-view.component.scss'],
})

export class TaskListViewComponent {

  public tabHeight = 94;
  public tableBodyHeight = 0;
  public isOptionListVisible = false;

  private _height: number = 0;
  @Input() 
  set height(height: number) {
    this._height = height;
    this.tableBodyHeight = height - 90;
     
  }
  get height(): number {        
      return this._height;
  }

  public displayOptionsList(): void {
    this.isOptionListVisible = !this.isOptionListVisible;
  }
  

}