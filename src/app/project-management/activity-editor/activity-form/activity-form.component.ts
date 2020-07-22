/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input,
         OnChanges, OnInit, Output, OnDestroy } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Observable, of, Subject } from 'rxjs';

import { ProjectStore } from '@app/store/project.store';
import { TaskService } from '@app/services/project-management/task.service';

import { Activity, EmptyActivity, EmptyTask,
         Task, TASK_TYPE_NAME } from '@app/models/project-management';

import { Contact, DateStringLibrary, isTypeOf } from '@app/models/core';

import { AbstractForm } from '@app/shared/services';
import { SharedService } from '@app/shared/shared.service';
import { ChangeDateDialogComponent } from '@app/project-management/change-date-dialog/change-date-dialog.component';
import { takeUntil } from 'rxjs/operators';


enum FormMessages {

  DurationValueConfig =
  'Incomplete estimated duration configuration.',

  IncompleteActivityData =
  'All fields marked in red are required.',

  PlannedEndDateIsGreaterThenDeadline =
  'Planned End Date can not be later than the Deadline.',

  WrongTrafficLightConfig =
  'Incomplete traffic light configuration.',
}


@Component({
  selector: 'emp-steps-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent extends AbstractForm implements OnInit, OnChanges, OnDestroy {

  @Output() activityDelete = new EventEmitter();
  @Output() activityChange = new EventEmitter<Activity>();

  @Input() activity: Activity = EmptyActivity;
  @Input() task: Task = EmptyTask;     // ToDo: Just one input for activity or task, not both

  form: FormGroup;

  resourcesList: Observable<string[]> = of([]);
  responsibles: Observable<Contact[]> = of([]);
  tagsList: Observable<string[]> = of([]);
  themesList: Observable<string[]> = of([]);


  private unsubscribe: Subject<void> = new Subject();

  constructor(private app: SharedService,
              private projectStore: ProjectStore,
              private taskStore: TaskService,
              private dialog: MatDialog) {
    super();
  }


  ngOnChanges() {
    if (!this.activity) {
      this.activity = EmptyActivity;
    }

    this.resetForm();
  }


  ngOnInit() {
    this.loadResources();
    this.loadResponsibles();
    this.loadThemes();
    this.loadTags();
  }


  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }


  onCancelEdition() {
    this.resetForm();
  }


  onComplete() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '400px',
    dialogConfig.minWidth = '600px',

    dialogConfig.data = {
      activity: this.activity,
      actualEndDate: this.form.value.actualEndDate
    };

    this.dialog.open(ChangeDateDialogComponent, dialogConfig)
      .afterClosed().subscribe(
        (result) => {
          if (result) {
            this.activityChange.emit();
            this.resetForm();
          }
        }

      );
  }


  onDelete() {
    const msg = `This operation will delete activity ` +
                `<strong>${this.activity.name}</strong> from this project.<br/><br/>` +
                `Do you want to delete this activity?`;

    this.app.messageBox.confirm(msg, 'Delete activity',
                               'DeleteCancel', 'Delete activity').subscribe(
      result => {
        if (result) {
          this.setCommand('deleteActivity');
          this.onSubmit({ skipFormValidation: true });
        }
      });
  }


  onReactivate() {
    const msg = `This operation will reactivate activity or obligation ` +
                `<strong>${this.activity.name}</strong> in order to modify it.<br/><br/>` +
                `Its Actual End Date will be removed.<br/><br/>` +
                `Do you want to re-open this activity or obligation?`;

    this.app.messageBox.confirm(msg, 'Reactivate activity or obligation',
                                'AcceptCancel', 'Reactivate').subscribe(
      result => {
        if (result) {
          this.setCommand('reactivateActivity');
          this.onSubmit({ skipFormValidation: true });
        }
      });
  }


  onStart() {

  }


  enableForm() {
    this.enable();
    this.updateEstimatedDurationControls();
    this.updateTrafficLightControls();
  }


  hasTemplate() {
    return (this.activity.template && this.activity.template.uid);
  }


  // abstract methods implementation


  protected createFormGroup(): FormGroup {
    // ToDo fix: this.formBuilder.group ... can't be used because
    // this method is called by super() constructor and
    // it executes before formBuilder is injected.

    return new FormGroup({

      name: new FormControl('', Validators.required),
      nameForeignLang: new FormControl(''),

      notes: new FormControl(),
      notesForeignLang: new FormControl(),

      theme: new FormControl(),
      resource: new FormControl(),
      tags: new FormControl(),

      deadline: new FormControl(),
      plannedEndDate: new FormControl(),
      actualStartDate: new FormControl(),
      actualEndDate: new FormControl(),

      durationValue: new FormControl({value: '', disabled: true}),
      durationType: new FormControl(),

      trafficLightDays: new FormControl({value: '', disabled: true}),
      trafficLightType: new FormControl(),

      responsibleUID: new FormControl('', Validators.required)
    });
  }


  protected execute(): Promise<any> {
    switch (this.command.name) {
      case 'completeTask':
        return Promise.resolve(this.completeTask());

      case 'deleteActivity':
        return this.deleteActivity();

      case 'reactivateActivity':
        return this.reactivateActivity();

      case 'updateActivity':
        return Promise.resolve(this.updateActivity());

      default:
        throw new Error(`Command '${this.command.name}' doesn't have a command handler.`);
    }
  }


  updateControls(sourceControl: string) {
    switch (sourceControl) {
      case 'durationType':
        this.updateEstimatedDurationControls();
        return;

      case 'trafficLightType':
        this.updateTrafficLightControls();
        return;

      default:

    }
  }


  protected validate(): Promise<any> {
    if (!this.valid) {
      this.addException(FormMessages.IncompleteActivityData);
    }

    this.validateTargetDate();

    this.validateEstimatedDuration();
    this.validateTrafficLight();


    return Promise.resolve();
  }


  // private methods


  private isPositiveInteger(str: string) {
    const n = Number(str);

    return n !== Infinity && Number.isInteger(n) && n > 0;
  }


  private updateEstimatedDurationControls() {
    const durationType = this.value('durationType');

    if (durationType === 'NA' || durationType === 'Unknown' || durationType === '') {
      return this.get('durationValue').disable();
    } else {
      return this.get('durationValue').enable();
    }
  }


  private updateTrafficLightControls() {
    const trafficLightType = this.value('trafficLightType');

    if (trafficLightType === 'CalendarDays') {
      return this.get('trafficLightDays').enable();
    } else {
      return this.get('trafficLightDays').disable();
    }
  }



  private validateIntegerValue(path: string, exceptionMsg?: string): void {
    const value = this.value(path);

    if (!value) {
      return;
    }

    if (!this.isPositiveInteger(value)) {
      this.addException(exceptionMsg || 'A control has a unrecognized value: ' + value);
      this.get(path).markAsDirty();
    }
  }


  private validateEstimatedDuration() {
    this.validateIntegerValue('durationValue', FormMessages.DurationValueConfig);

    if (this.value('durationType') === '') {
      this.addException('Please select the estimated duration type.');
      this.get('durationType').markAsDirty();
      return;
    }

    if (this.value('durationType') === 'Unknown' || this.value('durationType') === 'NA') {
      this.set('durationValue', '');

      return;
    }

    if (!this.value('durationValue')) {
      this.addException('I need the estimated duration value.');
      this.get('durationValue').markAsDirty();

      return;
    }
  }


  private validateTrafficLight() {
    this.validateIntegerValue('trafficLightDays', FormMessages.WrongTrafficLightConfig);

    if (this.value('trafficLightType') === '') {
      this.addException('Please select the traffic light configuration type.');
      this.get('trafficLightType').markAsDirty();
      return;
    }

    if (this.value('trafficLightType') !== 'CalendarDays') {
      this.set('trafficLightDays', '');

      return;
    }

    if (!this.value('trafficLightDays')) {
      this.addException('I need the number of days to calculate the traffic light rule.');
      this.get('trafficLightDays').markAsDirty();

      return;
    }
  }


  private deleteActivity(): Promise<void> {
    if (isTypeOf(this.activity, TASK_TYPE_NAME)) {
      this.taskStore.deleteTask(this.task)
      .subscribe(() => {
        this.resetForm();
        this.activityDelete.emit();
      });
      return Promise.resolve();
    }

    return this.projectStore.deleteActivity(this.activity)
               .then(() => this.activityDelete.emit())
               .catch(err => this.app.messageBox.showError(err).toPromise());
  }


  private getUpdateData() {
    const formModel = this.form.value;

    const data = {
      name: formModel.name,
      notes: formModel.notes,
      theme: formModel.theme,
      resource: formModel.resource,
      tags: formModel.tags,

      deadline: formModel.deadline,
      plannedEndDate: formModel.plannedEndDate,
      actualStartDate: formModel.actualStartDate,
      actualEndDate: formModel.actualEndDate,

      estimatedDuration: {
        value: formModel.durationValue,
        type: formModel.durationType
      },

      trafficLight: {
        days:formModel.trafficLightDays,
        type: formModel.trafficLightType,
      },


      responsibleUID: formModel.responsibleUID,

      foreignLang: {
        name: formModel.nameForeignLang,
        notes: formModel.notesForeignLang
      },

    };

    return data;
  }


  private rebuildForm() {
    this.form.reset({
      name: this.activity.name,
      nameForeignLang: this.activity.foreignLanguage.name,

      notes: this.activity.notes,
      notesForeignLang: this.activity.foreignLanguage.notes,

      theme: this.activity.theme,
      resource: this.activity.resource || '',
      tags: this.activity.tags,

      deadline: this.activity.deadline,
      plannedEndDate: this.activity.plannedEndDate,
      actualStartDate: this.activity.actualStartDate,
      actualEndDate: this.activity.actualEndDate,

      durationValue: this.activity.estimatedDuration.value !== 0 ? this.activity.estimatedDuration.value : '',
      durationType: this.activity.estimatedDuration.type,

      trafficLightDays: this.activity.trafficLight?.days || '',
      trafficLightType: this.activity.trafficLight?.type || 'Default',

      responsibleUID: this.activity.responsible.uid
    });

    this.cleanExceptions();
  }


  private resetForm() {
    this.rebuildForm();
    this.disable();
  }


  private completeTask(): Promise<void> {
    const updateData = this.getUpdateData();

    this.taskStore.completeTask(this.task, updateData)
    .subscribe(() => {
      this.resetForm();
      this.activityChange.emit();
    });
    return Promise.resolve();
  }


  private reactivateActivity(): Promise<void> {
    if (isTypeOf(this.activity, TASK_TYPE_NAME)) {
      this.taskStore.reactivateTask(this.task)
      .subscribe(() => {
        this.resetForm();
        this.activityChange.emit();
      });
      return Promise.resolve();
    }

    return this.projectStore.reactivateActivity(this.activity)
      .then(() => {
        this.resetForm();
        this.activityChange.emit();
      })
      .catch(err => this.app.messageBox.showError(err).toPromise());
  }


  private updateActivity(): Promise<void> {
    const updateData = this.getUpdateData();

    if (isTypeOf(this.activity, TASK_TYPE_NAME)) {
      this.taskStore.updateTask(this.task, updateData)
      .subscribe(() => {
        this.resetForm();
        this.activityChange.emit();
      });
      return Promise.resolve();
    }

    return this.projectStore.updateActivity(this.activity, updateData)
      .then(() => {
        this.resetForm();
        this.activityChange.emit();
      })
      .catch(err => this.app.messageBox.showError(err).toPromise());
  }


  private validateTargetDate(): void {
    const plannedEndDate = this.value('plannedEndDate');
    const deadline = this.value('deadline');

    if (!plannedEndDate || !deadline) {
      return;
    }

    if (DateStringLibrary.compareDates(plannedEndDate, deadline) > 0) {
      this.addException(FormMessages.PlannedEndDateIsGreaterThenDeadline);
      this.get('plannedEndDate').markAsDirty();
    }
  }


  // these methods must be handled through component input data (architecture concern)


  private loadResources() {
    this.resourcesList = this.projectStore.resources
                             .pipe(takeUntil(this.unsubscribe));
  }


  private loadResponsibles() {
    this.responsibles = this.projectStore.responsibles(this.activity.project)
                                         .pipe(takeUntil(this.unsubscribe));
  }


  private loadTags() {
    this.tagsList = this.projectStore.tags
                          .pipe(takeUntil(this.unsubscribe));
  }


  private loadThemes() {
    this.themesList = this.projectStore.themes
                          .pipe(takeUntil(this.unsubscribe));
  }

}
