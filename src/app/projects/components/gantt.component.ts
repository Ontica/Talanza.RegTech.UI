import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";

import "dhtmlx-gantt";
import {} from "@types/dhtmlxgantt";

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
    template: "<div #gantt_here style='width: 100%; height: 100%;'></div>",
})
export class GanttComponent implements OnInit {
    @ViewChild("gantt_here") ganttContainer: ElementRef;

    ngOnInit(){
        gantt.init(this.ganttContainer.nativeElement);
    }
}