import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";

import "dhtmlx-gantt";
import {} from "@types/dhtmlxgantt";

import { ProjectService } from '../services/project.service';
import { ProjectRef } from '../data-types/project';

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
                    <project-add-activity [project]="project"[parentId]="parentId" (onCloseEvent)="onCloseAddActivityEditorWindow()"></project-add-activity>
                </div>
                <div *ngIf="isStartActivityEditorWindowVisible" class="popup">
                    <project-start-activity [project]="project" (onCloseEvent)="onCloseStartActivityEditorWindow()"></project-start-activity>
                </div>` ,
providers: [ProjectService]
})

export class GanttComponent implements OnInit {
    @ViewChild("gantt_here") ganttContainer: ElementRef;

    @Input() public project: ProjectRef;

    public isAddActivityEditorWindowVisible = false;
    public isStartActivityEditorWindowVisible = false;
    public parentId: number;

    constructor(private projectService: ProjectService) {}

    ngOnInit() {

        gantt.config.xml_date = "%Y-%m-%d %H:%i";
        gantt.config.grid_resize = true;
        gantt.config.scale_unit = 'month';

        gantt.init(this.ganttContainer.nativeElement);
        
        gantt.attachEvent("onTaskCreated", (id, item) => {		    
		    if (!id.parent) {
					this.parentId = null;
            } else {
                    this.parentId = id.parent;
            }
            this.isAddActivityEditorWindowVisible = true;
            
		});

        gantt.attachEvent("onTaskDblClick", (id, item) => {	
             this.isStartActivityEditorWindowVisible = true;
        });

         Promise.all([this.projectService.getTasksList(this.project.uid),])
            .then(([data]) => {                           
               gantt.parse({data});
            });
    }

    public async updateGanttGraph()  {
        await  Promise.all([this.projectService.getTasksList(this.project.uid),])
            .then(([data]) => {                           
               gantt.parse({data});
            });          
    }

    public onCloseAddActivityEditorWindow(): void {
        this.isAddActivityEditorWindowVisible = false;
        this.updateGanttGraph();
    }

    public onCloseStartActivityEditorWindow(): void {
        this.isStartActivityEditorWindowVisible = false;
        
    }
}