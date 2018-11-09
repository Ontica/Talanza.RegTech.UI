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
  "Los campos marcados en rojo son requeridos.",

  TargetDateIsGreaterThanDueDate =
  "La fecha objetivo de la actividad no puede ser posterior a la fecha máxima de entrega.",
}


@Component({
  selector: 'activity-form',
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

  constructor(private app: SharedService,
              private projectStore: ProjectStore, private taskStore: TaskService) {
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
  }


  onCancelEdition() {
    this.resetForm();
  }


  onDelete() {
    const msg = `Esta operación eliminará la actividad ` +
                `<strong>${this.activity.name}</strong> de este proyecto.<br/><br/>` +
                `¿Elimino esta actividad?`;

    this.app.messageBox.confirm(msg, "Eliminar actividad", 'DeleteCancel', 'Eliminar esta actividad').subscribe(
      result => {
        if (result) {
          this.setCommand('delete');
          this.onSubmit({ skipFormValidation: true });
        }
      });
  }


  onEnd() {

  }


  onStart() {

  }


  // abstract methods implementation

  protected createFormGroup(): FormGroup {
    // ToDo fix: this.formBuilder.group ... can't be used because
    // this method is called by super() constructor and
    // it executes before formBuilder is injected.

    return new FormGroup({

      name: new FormControl('', Validators.required),
      notes: new FormControl(),

      startDate: new FormControl(),
      targetDate: new FormControl(),
      dueDate: new FormControl(),
      endDate: new FormControl(),

      durationValue: new FormControl(),
      durationType: new FormControl(),

      warnDays: new FormControl(),
      warnType: new FormControl(),

      responsibleUID: new FormControl('', Validators.required),
      ragStatus: new FormControl('', Validators.required),

    });
  }


  protected execute(): Promise<any> {
    switch (this.command.name) {
      case 'delete':
        return this.deleteActivity();

      case 'update':
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

      startDate: formModel.startDate,
      targetDate: formModel.targetDate,
      dueDate: formModel.dueDate,
      endDate: formModel.endDate,

      estimatedDuration: {
        value: formModel.durationValue,
        type: formModel.durationType
      },

      warnDays: formModel.warnDays,
      warnType: formModel.warnType,

      responsibleUID: formModel.responsibleUID,
      ragStatus: formModel.ragStatus,
    };

    return data;
  }


  private rebuildForm() {
    this.form.reset({
      name: this.activity.name,
      notes: this.activity.notes,

      startDate: this.activity.startDate,
      targetDate: this.activity.targetDate,
      dueDate: this.activity.dueDate,
      endDate: this.activity.endDate,

      durationValue: this.activity.estimatedDuration.value !== 0 ? this.activity.estimatedDuration.value : '',
      durationType: this.activity.estimatedDuration.type,

      warnDays: this.activity.warnDays !== 0 ? this.activity.warnDays : '',
      warnType: this.activity.warnType,

      responsibleUID: this.activity.responsible.uid,
      ragStatus: this.activity.ragStatus,

    });

    this.cleanExceptions();
  }


  private resetForm() {
    this.rebuildForm();
    this.disable();
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
    const targetDate = this.value('targetDate');
    const dueDate = this.value('dueDate');

    if (!targetDate || !dueDate) {
      return;
    }

    if (DateStringLibrary.compareDateParts(targetDate, dueDate) > 0) {
      this.addException(FormMessages.TargetDateIsGreaterThanDueDate);
      this.get('targetDate').markAsDirty();
    }


  }

  // these methods must be handled through component input data (architecture concern)

  private loadResponsibles() {
    this.responsibles = this.projectStore.responsibles(this.activity.project);
  }

}