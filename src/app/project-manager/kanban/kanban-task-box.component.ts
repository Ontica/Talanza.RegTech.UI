import { Component } from '@angular/core';

@Component({
  selector:'kanban-task-box',
  templateUrl: './kanban-task-box.component.html',
  styleUrls: ['./kanban-task-box.component.scss']
})

export class KanbanTaskBoxComponent {

  public isSelectListVisible = false;

  private taskStatus = 'i';
  private isBlocked = false; 

  public  drag(ev:any): void { 
    console.log("ev" , ev);    
     if (!this.isBlocked) {
      ev.dataTransfer.setData("text", ev.target.id);
    }
  }

  public setCssClass(): string {
    switch(this.taskStatus) {
      case 's': return 'stop-task';
      case 'p': return 'process-task';
      case 'i': return 'important-tak';
      default: return  'stop-task';
    }    
  }

  public displaySelectList(): void {
    this.isSelectListVisible = !this.isSelectListVisible;
  }

}