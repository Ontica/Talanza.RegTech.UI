/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, ChangeDetectionStrategy,
         ElementRef, EventEmitter,
         Input, Output, OnDestroy, OnInit,
         ViewChild, ViewEncapsulation } from '@angular/core';

import { ProjectModel, ProjectStore } from '@app/store/project.store';

import 'dhtmlx-gantt';

declare let gantt: any;

import { Activity, ViewConfig, GanttTask } from '@app/models/project-management';

import { GanttService } from '@app/services/project-management';
import { Subscription } from 'rxjs';

@Component({
  selector: 'emp-steps-dhtmlx-gantt',
  templateUrl: './dhtmlx-gantt.component.html',
  styleUrls: ['./dhtmlx-gantt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class DhtmlxGanttComponent implements OnInit, OnDestroy {

  @Input()
  get project(): ProjectModel { return this._project; }
  set project(value: ProjectModel) {
    if (this.project && this.project.project.uid !== value.project.uid) {
      this.selectedTask = null;
    }

    this._project = value;

    this.refreshData();
  }
  private _project;

  private selectedView$: Subscription;
  private attachEvent$: any;

  @Input()
  get config(): ViewConfig { return this._config; }
  set config(value: ViewConfig) {
    this._config = value;
    this.configGantt();
    this.resetGantt();
  }
  private _config;


  @Input()
  set reset(value: boolean) {
     this.resetGantt();
  }

  @Output() activitySelected = new EventEmitter<Activity>();

  @ViewChild('gantt') ganttContainer: ElementRef;


  private ganttData: GanttTask[] = [];
  private selectedTask: GanttTask;
  private innerReset = false;

  constructor(private store: ProjectStore,
              private ganttService: GanttService) { }


  ngOnInit() {
    this.selectedView$ = this.store.selectedView().subscribe(
      x => this.config = x
    );


    this.attachEvents();

    this.configGantt();
    this.resetGantt();
  }


  ngOnDestroy() {
    this.selectedView$.unsubscribe();
    gantt.detachEvent(this.attachEvent$);
  }



 // Private methods

  private attachEvents() {

    this.attachEvent$ = gantt.attachEvent('onTaskSelected', id => {
      if (this.innerReset) {
        this.innerReset = false;
        return;
      }

      this.selectedTask = this.ganttData.find(x => x.id === +id);


      if (this.selectedTask && this.selectedTask.uid) {
        const activity = this.store.getActivity(this.selectedTask.uid);

        return this.activitySelected.emit(activity);
      } else {
        console.log('Undefined this.selectedTask.id:', id, this.ganttData);
      }

    });

  }


  private configGantt() {
    this.setLayout();
    this.setProperties();
    this.setTemplates();
    this.setViewConfig();
  }


  private refreshData() {
    if (this.project.project.uid === '') {
      return;
    }

    const links = [
      { id: 1, source: 103271, target: 103272, type: '1'},                       // link's id = 1
      { id: 2, source: 103272, target: 103273, type: '0'},                       // link's id = 2
      { id: 3, source: 103273, target: 103274, type: '0'}                        // link's id = 3
    ];

    this.ganttService.getActivitiesTree(this.project.project)
                     .toPromise()
                     .then(data => {
                        this.ganttData = data;
                        gantt.clearAll();
                        gantt.parse({ data, links });
                      });
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
      { name: 'text', label: 'Obligaciones / Actividades',
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

    gantt.templates.grid_file = item => {
      return "<div class='gantt_tree_icon'></div>";
    };
  }


  private setViewConfig() {
    gantt.config.scale_unit = this.config ? this.config.timeScaleUnit : 'quarter';

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
