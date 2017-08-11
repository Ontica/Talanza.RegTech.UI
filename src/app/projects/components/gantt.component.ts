import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";

import "dhtmlx-gantt";
import {} from "@types/dhtmlxgantt";

import { ProjectService } from '../services/project.service';

@Component({
    selector: "gantt",
    styles: [
        `
        :host{
            display: block;
            height: 600px;
            position: relative;
            width: 100%;
        }
    `],
    template:  `<div #gantt_here style='width: 100%; height: 100%;'></div>
    <div *ngIf="isAddActivityEditorWindowVisible" class="popup">
  <project-add-activity (onCloseEvent)="onCloseAddActivityEditorWindow()"></project-add-activity>
</div>` ,
providers: [ProjectService]
})

export class GanttComponent implements OnInit {
    @ViewChild("gantt_here") ganttContainer: ElementRef;

    @Input() public projectUID:string;

    public isAddActivityEditorWindowVisible = false;

    constructor(private projectService: ProjectService) {}

    ngOnInit() {

        gantt.config.xml_date = "%Y-%m-%d %H:%i";

        gantt.init(this.ganttContainer.nativeElement);
        
        gantt.attachEvent("onTaskDblClick", (id, item) => {		
			 this.isAddActivityEditorWindowVisible = true;
        });

         Promise.all([this.projectService.getTasksList(this.projectUID),])
            .then(([data]) => {                           
               gantt.parse({data});
            });


    }
    public onCloseAddActivityEditorWindow(): void {
        this.isAddActivityEditorWindowVisible = false;
    }
}