/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, ElementRef, EventEmitter,
         Input, Output, OnDestroy, OnInit,
         ViewChild, ViewEncapsulation } from '@angular/core';

import 'dhtmlx-gantt';

declare let gantt: any;

import { GanttTask } from '@app/models/project-management';

@Component({
  selector: 'emp-steps-dhtmlx-gantt',
  templateUrl: './dhtmlx-gantt.component.html',
  styleUrls: ['./dhtmlx-gantt.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DhtmlxGanttComponent implements OnInit, OnDestroy {

  @Input()
  get tasks(): GanttTask[] { return this._tasks; }
  set tasks(value: GanttTask[]) {
    try {
      if (!value) {
        value = [];
        this.selectedTask = null;
      }
      if (this.selectedTask && !value.find(x => x.uid === this.selectedTask.uid)) {
        this.selectedTask = null;
      }

      this._tasks = value;

      this.refreshData();
    } catch (e) {
      console.log('Exception loading data', e);
    }
  }
  private _tasks: GanttTask[] = [];


  @Input()
  get timeScaleUnit(): string { return this._timeScaleUnit; }
  set timeScaleUnit(value: string) {
    this._timeScaleUnit = value;
    this.configGantt();
    this.resetGantt();
  }
  private _timeScaleUnit = 'quarter';


  @Input()
  set reset(value: boolean) {
     this.resetGantt();
  }

  @Output() activitySelected = new EventEmitter<GanttTask>();

  @ViewChild('gantt') ganttContainer: ElementRef;


  private attachEvent$: any;

  private selectedTask: GanttTask;
  private innerReset = false;


  constructor() { }


  ngOnInit() {
    this.attachEvents();

    this.configGantt();
    this.resetGantt();
  }


  ngOnDestroy() {
    gantt.detachEvent(this.attachEvent$);
    gantt.clearAll();

    // gantt.destructor(); // PRO VERSION
  }



 // Private methods

  private attachEvents() {

    this.attachEvent$ = gantt.attachEvent('onTaskSelected', id => {
      if (this.innerReset) {
        this.innerReset = false;
        return;
      }

      this.selectedTask = this.tasks.find(x => x.id === +id);


      if (this.selectedTask && this.selectedTask.uid) {
        return this.activitySelected.emit(this.selectedTask);
      } else {
        console.log('Undefined this.selectedTask.id:', id, this.tasks);
      }

    });

  }


  private configGantt() {
    this.setLayout();
    this.setProperties();
    this.setTemplates();
    this.setTimescale();
  }


  private refreshData() {
    const data = this.tasks;
    const links =  [
      //   // { id: 1, source: 103271, target: 103272, type: '1'},                       // link's id = 1
      //   // { id: 2, source: 103272, target: 103273, type: '0'},                       // link's id = 2
      //   // { id: 3, source: 103273, target: 103274, type: '0'}                        // link's id = 3
    ];

    gantt.clearAll();
    gantt.parse({ data, links });
  }


  private resetGantt() {
    gantt.init(this.ganttContainer.nativeElement);

    if (this.selectedTask) {
      this.innerReset = true;
      gantt.selectTask(this.selectedTask.id);
      gantt.showTask(this.selectedTask.id);
    }
  }


  private setLayout() {

    gantt.config.layout = {
      css: 'gantt_container',
      rows: [
          {
             cols: [
              {
                view: 'grid',
                scrollX: 'scrollHor',
                scrollY: 'scrollVer'
              },
              { resizer: true, width: 1 },
              {
                view: 'timeline',
                scrollX: 'scrollHor',
                scrollY: 'scrollVer'
              },
              {
                view: 'scrollbar',
                id: 'scrollVer'
              }
          ]},
          {
            view: 'scrollbar',
            id: 'scrollHor'
          }
      ]
    };

  }


  private setProperties() {
    gantt.config.columns =  [
      { name: 'text', label: 'Activities',
        width: '*', min_width: 520, tree: true, resize: true
      }
    ];

    gantt.config.xml_date = '%Y-%m-%d %H:%i';

    gantt.config.keep_grid_width = true;
    gantt.config.show_progress = true;
    gantt.config.drag_progress = false;
    gantt.config.open_tree_initially = true;

    gantt.config.smart_rendering = true;
    gantt.config.drag_progress = false;
    gantt.config.open_tree_initially = true;
    gantt.config.select_task = true;
    gantt.config.readonly = true;
    gantt.config.smart_scales = true;
    gantt.config.preserve_scroll = true;
  }


  private setTemplates() {
    gantt.templates.grid_folder = item => {
      return "<div class='gantt_tree_icon " + (item.$open ? 'open' : 'closed') + "'></div>";
    };

    gantt.templates.grid_file = () => {
      return "<div class='gantt_tree_icon'></div>";
    };
  }


  private setTimescale() {
    gantt.config.scale_unit = this.timeScaleUnit ? this.timeScaleUnit : 'quarter';

    switch (gantt.config.scale_unit) {
      case 'year':
        gantt.config.date_scale = '%Y';
        break;
      case 'quarter':
        gantt.config.date_scale = '%M-%Y';
        break;
      case 'month':
        gantt.config.date_scale = '%M-%Y';
        break;
      case 'week':
        gantt.config.date_scale = '%d %M %y';
        break;
    }
  }

}
