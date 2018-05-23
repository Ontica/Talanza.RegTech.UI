/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input,
         OnChanges, OnInit, Output} from '@angular/core';

import { FormBuilder, FormControl,
         FormGroup, Validators } from '@angular/forms';

import { Assertion } from 'empiria';

import { Contact } from '../../core/core-data-types';
import { ColoredTag } from '../../core/ui-data-types';

import { AbstractForm, MessageBoxService, SpinnerService } from '../../core/ui-services';

import { Activity, Activity_Empty } from '../data-types';

import { ActivityService, ProjectService } from '../services';


enum FormMessages {

  IncompleteActivityData =
    "Los campos marcados en rojo son requeridos.",

  TargetDateIsGreaterThanDueDate =
    "La fecha objetivo de la actividad no puede ser posterior a la fecha máxima de entrega.",

}


@Component({
  selector: 'activity-editor',
  templateUrl: './activity-editor.component.html',
  styleUrls: ['./activity-editor.component.scss']
})
export class ActivityEditorComponent extends AbstractForm implements OnInit, OnChanges {

  @Output() close = new EventEmitter();
  @Output() update = new EventEmitter<Activity>();

  @Input() activity: Activity = Activity_Empty;

  form: FormGroup;

  responsibles: Contact[] = [];
  tags: ColoredTag[] = [];
  selectedTags: ColoredTag[] = [];

  constructor(spinner: SpinnerService,
              private formBuilder: FormBuilder,
              private messageBox: MessageBoxService,
              private activityService: ActivityService,
              private projectService: ProjectService) {
    super();
    this.setSpinner(spinner);   // remove after resolve core module injection issue
  }


  get Msg(): typeof FormMessages {
    return FormMessages;
  }


  ngOnChanges() {
    if (!this.activity) {
      this.activity = Activity_Empty;
    }
    this.loadSelectedTags();

    this.onReset();
  }


  ngOnInit() {
    this.loadTags();

    this.loadResponsibles();
  }


  onClose() {
    this.close.emit();
  }


  onReset() {
    this.rebuildForm();
    this.disable();
  }


  // abstract methods implementation

  protected createFormGroup(): FormGroup {
    // ToDo fix: this.formBuilder.group ... can't be used because
    // this method is called by super() constructor and
    // it executes before formBuilder is injected.

    return new FormGroup({

      name: new FormControl(Validators.required),

      notes: new FormControl(),

      responsibleUID: new FormControl('', Validators.required),

      ragStatus: new FormControl('', Validators.required),

      targetDate: new FormControl(),

      dueDate: new FormControl(),

    });
  }


  protected execute(): Promise<any> {

    switch(this.command.name) {

      case 'update':
        return this.updateActivity();

      case 'delete':
        return this.deleteActivity();

      default:
        throw new Error(`Command '${this.command.name}' doesn't have a command handler.`);
    }
  }


  protected validate(): Promise<any> {
    if (!this.valid) {
      this.addException(FormMessages.IncompleteActivityData);
    }

    this.validateTargetDate();

    return Promise.resolve();
  }


  // private methods

  private deleteActivity() {
    return this.activityService.deleteActivity(this.activity)
                               .then( () => {
                                 Object.assign(this.activity, null);
                                 this.onClose();
                               })
                               .catch( e => this.messageBox.show(e) );
  }


  private getUpdateData() {
    const formModel = this.form.value;

    const data = {
      name: formModel.name,
      notes: formModel.notes,
      tags: this.getSelectedTags(),
      responsibleUID: formModel.responsibleUID,
      ragStatus: formModel.ragStatus,

      targetDate: formModel.targetDate,
      dueDate: formModel.dueDate,

    };

    return data;
  }


  private rebuildForm() {
    this.form.reset({
      name: this.activity.name,
      notes: this.activity.notes,
      responsibleUID: this.activity.responsible.uid,
      ragStatus: this.activity.ragStatus,
      targetDate: this.activity.targetDate,
      dueDate: this.activity.dueDate,
    });

    this.setActivityTags();
    this.cleanExceptions();
  }


  private updateActivity(): Promise<void> {

    const updateData = this.getUpdateData();

    return this.activityService.updateActivity(this.activity, updateData)
               .toPromise()
               .then (x => {
                  Object.assign(this.activity, x);
                  // this.update.emit(this.activity);
                  this.onReset();
                });
  }

  private validateTargetDate(): void {
    const targetDate = this.value('targetDate');
    const dueDate = this.value('dueDate');

    console.log("targetDate", targetDate, "dueDate", dueDate);

    if (!targetDate || !dueDate) {
      return;
    }

    if (targetDate > dueDate) {
      this.addException(FormMessages.TargetDateIsGreaterThanDueDate);
      this.get('targetDate').markAsDirty();
    }
  }


  // these methods must be handled through component input data (architecture concern)

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


  private getSelectedTags() {
    return this.selectedTags.filter( x => x.selected === true )
                            .map( x => x.name );
  }

  onSelectedTags(selectedTags: any) {
    this.selectedTags = selectedTags;
  }

  private setActivityTags() {
    this.activity.tags = this.selectedTags.filter( x => x.selected === true )
                                          .map( x => x.name );
  }


  private selectTag(tag: string) {
    const index = this.tags.findIndex( x => x.name === tag );

    if (index !== -1) {
      this.tags[index].selected = true;
    }
  }

}
