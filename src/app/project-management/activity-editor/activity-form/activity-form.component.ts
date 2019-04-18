/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input,
         OnChanges, OnInit, Output } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable, of } from 'rxjs';

import { ProjectStore } from '@app/store/project.store';
import { TaskService } from '@app/services/project-management/task.service';

import { Activity, EmptyActivity, EmptyTask,
         Task, TASK_TYPE_NAME } from '@app/models/project-management';

import { Contact, DateStringLibrary, isTypeOf } from '@app/models/core';

import { AbstractForm } from '@app/shared/services';
import { SharedService } from '@app/shared/shared.service';


enum FormMessages {
  IncompleteActivityData =
  'All fields marked in red are required.',

  PlannedEndDateIsGreaterThenDeadline =
  'Planned End Date can not be later than the Deadline.',
}


@Component({
  selector: 'emp-steps-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent extends AbstractForm implements OnInit, OnChanges {

  @Output() delete = new EventEmitter();
  @Output() update = new EventEmitter<Activity>();

  @Input() activity: Activity = EmptyActivity;
  @Input() task: Task = EmptyTask;     // ToDo: Just one input for activity or task, not both

  form: FormGroup;

  responsibles: Observable<Contact[]> = of([]);
  themesList: Observable<string[]> = of([]);

  constructor(private app: SharedService,
              private projectStore: ProjectStore,
              private taskStore: TaskService) {
    super();
  }


  ngOnChanges() {
    if (!this.activity) {
      this.activity = EmptyActivity;
    }

    this.resetForm();
  }


  ngOnInit() {
    this.loadResponsibles();
    this.loadThemes();
  }


  onCancelEdition() {
    this.resetForm();
  }


  onComplete() {
    const msg = `This operation will close activity or obligation ` +
                `<strong>${this.activity.name}</strong>.<br/><br/>` +
                `Do you want to close this activity?`;

    this.app.messageBox.confirm(msg, 'Close activity or obligation',
                               'AcceptCancel', 'Close activity').subscribe(
      result => {
        if (result) {
          this.setCommand('completeActivity');
          this.onSubmit({ skipFormValidation: true });
        }
      });
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

    if (this.hasTemplate()) {
      this.get('theme').disable();
    }
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
      notes: new FormControl(),
      theme: new FormControl(),

      deadline: new FormControl(),
      plannedEndDate: new FormControl(),
      actualStartDate: new FormControl(),
      actualEndDate: new FormControl(),

      durationValue: new FormControl(),
      durationType: new FormControl(),

      warnDays: new FormControl(),
      warnType: new FormControl(),

      responsibleUID: new FormControl('', Validators.required)
    });
  }


  protected execute(): Promise<any> {
    switch (this.command.name) {
      case 'completeActivity':
        return Promise.resolve(this.completeActivity());

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


  protected validate(): Promise<any> {
    if (!this.valid) {
      this.addException(FormMessages.IncompleteActivityData);
    }

    this.validateTargetDate();

    return Promise.resolve();
  }


  // private methods


  private deleteActivity(): Promise<void> {
    if (isTypeOf(this.activity, TASK_TYPE_NAME)) {
      this.taskStore.deleteTask(this.task)
      .subscribe(() => {
        this.resetForm();
        this.delete.emit();
      });
      return Promise.resolve();
    }

    return this.projectStore.deleteActivity(this.activity)
               .then(() => this.delete.emit())
               .catch(err => this.app.messageBox.showError(err).toPromise());
  }


  private getUpdateData() {
    const formModel = this.form.value;

    const data = {
      name: formModel.name,
      notes: formModel.notes,
      theme: formModel.theme,

      deadline: formModel.deadline,
      plannedEndDate: formModel.plannedEndDate,
      actualStartDate: formModel.actualStartDate,
      actualEndDate: formModel.actualEndDate,

      estimatedDuration: {
        value: formModel.durationValue,
        type: formModel.durationType
      },

      warnDays: formModel.warnDays,
      warnType: formModel.warnType,

      responsibleUID: formModel.responsibleUID
    };

    return data;
  }


  private rebuildForm() {
    this.form.reset({
      name: this.activity.name,
      notes: this.activity.notes,
      theme: this.activity.theme,

      deadline: this.activity.deadline,
      plannedEndDate: this.activity.plannedEndDate,
      actualStartDate: this.activity.actualStartDate,
      actualEndDate: this.activity.actualEndDate,

      durationValue: this.activity.estimatedDuration.value !== 0 ? this.activity.estimatedDuration.value : '',
      durationType: this.activity.estimatedDuration.type,

      warnDays: this.activity.warnDays !== 0 ? this.activity.warnDays : '',
      warnType: this.activity.warnType,

      responsibleUID: this.activity.responsible.uid
    });

    this.cleanExceptions();
  }


  private resetForm() {
    this.rebuildForm();
    this.disable();
  }


  private completeActivity(): Promise<void> {
    const updateData = this.getUpdateData();

    if (isTypeOf(this.activity, TASK_TYPE_NAME)) {
      this.taskStore.completeTask(this.task, updateData)
      .subscribe(() => {
        this.resetForm();
        this.update.emit();
      });
      return Promise.resolve();
    }

    return this.projectStore.completeActivity(this.activity, updateData)
      .then(() => {
        this.resetForm();
        this.update.emit();
      })
      .catch(err => this.app.messageBox.showError(err).toPromise());
  }


  private reactivateActivity(): Promise<void> {
    if (isTypeOf(this.activity, TASK_TYPE_NAME)) {
      this.taskStore.reactivateTask(this.task)
      .subscribe(() => {
        this.resetForm();
        this.update.emit();
      });
      return Promise.resolve();
    }

    return this.projectStore.reactivateActivity(this.activity)
      .then(() => {
        this.resetForm();
        this.update.emit();
      })
      .catch(err => this.app.messageBox.showError(err).toPromise());
  }


  private updateActivity(): Promise<void> {
    const updateData = this.getUpdateData();

    if (isTypeOf(this.activity, TASK_TYPE_NAME)) {
      this.taskStore.updateTask(this.task, updateData)
      .subscribe(() => {
        this.resetForm();
        this.update.emit();
      });
      return Promise.resolve();
    }

    return this.projectStore.updateActivity(this.activity, updateData)
      .then(() => {
        this.resetForm();
        this.update.emit();
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

  private loadResponsibles() {
    this.responsibles = this.projectStore.responsibles(this.activity.project);
  }

  private loadThemes() {
    this.themesList = this.projectStore.themes;
  }

}
