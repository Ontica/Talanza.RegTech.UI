/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

import { Assertion } from 'empiria';
import { Contact, ColoredTag } from '../../core/core-data-types';

import { MessageBoxService, SpinnerService } from '../../core/ui-services';

import { Activity } from '../data-types';

import {
  ActivityService,
  ProjectService
} from '../services';


@Component({
  selector: 'activity-editor',
  templateUrl: './activity-editor.component.html',
  styleUrls: ['./activity-editor.component.scss']
})
export class ActivityEditorComponent {

  @Output() close = new EventEmitter();
  @Output() update = new EventEmitter<Activity>();

  @Input()
  get activity(): Activity { return this._activity; }
  set activity(activity: Activity) {
    this._activity = activity;

    this.initialize();
  }
  private _activity: Activity;

  responsibles: Contact[] = [];
  tags: ColoredTag[] = [];
  selectedTags: ColoredTag[] = [];

  constructor(private spinner: SpinnerService,
              private messageBox: MessageBoxService,
              private activityService: ActivityService,
              private projectService: ProjectService) { }


  onCancel() {
    this.close.emit();
  }


  onClose() {
    this.close.emit();
  }


  onSave() {
    if (!this.validateTargetDate()) {
      return;
    }

    this.setSelectedTags();

    this.updateActivity();
  }


  onSelectedTags(selectedTags: any) {
    this.selectedTags = selectedTags;
  }

  // private methods

  private initialize() {
    this.loadTags();

    this.loadResponsibles();

    if (this.activity) {
      this.loadSelectedTags();
    }
  }


  private loadResponsibles() {
    this.projectService.getResponsiblesList(this.activity.project.uid)
                       .subscribe( x => this.responsibles = x );
  }


  private loadSelectedTags() {
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


  private setSelectedTags() {
    this.activity.tags = this.selectedTags.filter( x => x.selected === true )
                                          .map( x => x.name );
  }


  private selectTag(tag: string) {
    const index = this.tags.findIndex( x => x.name === tag );

    if (index !== -1) {
      this.tags[index].selected = true;
    }
  }


  private updateActivity() {
    this.spinner.show();

    this.activityService.updateActivity(this.activity)
                        .subscribe(
                          x => {
                            this.activity = x;
                            this.update.emit(x);
                          },
                          err => this.messageBox.show(err, 'Error'),
                          () => this.spinner.hide()
                        );
  }


  private validateTargetDate(): boolean {
    const targetDate = this.activity.targetDate;
    const dueDate = this.activity.dueDate;

    if (!targetDate || !dueDate) {
      return true;
    }

    if (targetDate > dueDate) {
      this.messageBox.show("La fecha objetivo de la actividad no puede ser posterior a la fecha máxima de entrega.",
                           "Validación");
      return false;
    }

    return true;
  }

}
