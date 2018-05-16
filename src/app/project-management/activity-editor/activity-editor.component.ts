/**
* @license
* Copyright (c) 2017-2018 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
*
* See LICENSE.txt in the project root for complete license information.
*
*/

import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

import { Assertion } from 'empiria';

import { Contact, ColoredTag } from '../../core/core-data-types';

import { Activity } from '../data-types/activity';

import { ActivityService } from '../services/activity.service';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'activity-editor',
  templateUrl: './activity-editor.component.html',
  styleUrls: ['./activity-editor.component.scss'],
  providers: [ActivityService, ProjectService]
})

export class ActivityEditorComponent {

  responsibles: Contact[] = [];
  tags: ColoredTag[] = [];
  selectedTags: ColoredTag[] = [];

  private _activity: Activity;
  @Input()
  set activity(activity: Activity) {
    this._activity = activity;

    this.initialize();
  }
  get activity(): Activity {
    return this._activity;
  }

  @Output() onCloseEvent = new EventEmitter();
  @Output() onUpdateActivity = new EventEmitter<Activity>();

  constructor(private activityService: ActivityService,
              private projectService: ProjectService) { }


  onCancel(): void {
    this.onCloseEvent.emit();
  }


  onClose(): void {
    this.onCloseEvent.emit();
  }


  onSave(): void {
    if (!this.validateTargetDate()) {
      return;
    }

    this.setSelectedTags();

    this.updateActivity();
  }


  onSelectedTags(selectedTags: any): void {
    this.selectedTags = selectedTags;
  }


  parseDate(dateString: string): Date {
    if (dateString) {
      return new Date(dateString);
    } else {
      return null;
    }
  }

  // private methods

  private initialize() {
    this.loadTags();

    this.loadResponsiblesList();

    if (this.activity) {
      this.loadTags();

      this.loadSelectedTags();

      this.loadResponsiblesList();
    }
  }


  private loadResponsiblesList(): void {
    this.projectService.getResponsiblesList(this.activity.project.uid)
                       .subscribe( x => this.responsibles = x );
  }


  private loadSelectedTags(): void {
    this.activity.tags.forEach( x => this.selectTag(x) );

    this.selectedTags = this.tags.filter(x => x.selected === true);
  }


  private loadTags() {
    this.projectService.getTags()
                       .subscribe( x => {
                         this.tags = x;
                         this.tags.forEach( x => x.selected = false);
                       });
  }


  private setSelectedTags(): void {
    this.activity.tags = this.selectedTags.filter( x => x.selected === true )
                                          .map( x => x.name );
  }


  private selectTag(tag: string): void {
    const index = this.tags.findIndex( x => x.name === tag );

    if (index !== -1) {
      this.tags[index].selected = true;
    }
  }


  private updateActivity() {
    this.activityService.updateActivity(this.activity)
                        .subscribe( x => this.onUpdateActivity.emit(x) );
  }


  private validateTargetDate(): boolean {
    const targetDate = this.activity.targetDate;
    const dueDate = this.activity.dueDate;

    if (targetDate > dueDate) {
      alert("La fecha objetivo de la actividad no puede ser posterior a la fecha máxima de entrega.");
      return false;
    }

    return true;
  }

}
