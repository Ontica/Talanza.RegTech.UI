/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import {
  Component, EventEmitter, Input,
  OnChanges, OnInit, Output
} from '@angular/core';

import {
  FormControl,
  FormGroup, Validators
} from '@angular/forms';

import { Observable, of } from 'rxjs';

import { Contact, DateStringLibrary } from '@app/models/core';

import { ProjectStore } from '@app/store/project.store';

import { Activity, Activity_Empty } from '@app/models/project-management';
import { ColoredTag } from '@app/models/user-interface';

import { AbstractForm } from '@app/shared/abstract-form';

import { SharedService } from '@app/shared/shared.service';

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

  responsibles: Observable<Contact[]> = of([]);
  tags: ColoredTag[] = [];
  selectedTags: ColoredTag[] = [];

  procedureDialogVisible = false;

  constructor(private app: SharedService,
              private projectStore: ProjectStore) {
    super();
    this.setSpinner(app.spinner);   // remove after resolve core module injection issue
  }


  get Msg(): typeof FormMessages {
    return FormMessages;
  }


  ngOnChanges() {
    if (!this.activity) {
      this.activity = Activity_Empty;
    }

    //this.loadSelectedTags();

    this.onReset();

    this.showProcedureDialog(false);
  }


  ngOnInit() {
    //this.loadTags();

    this.loadResponsibles();
  }


  onClose() {
    this.close.emit();
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


  onReset() {
    this.rebuildForm();
    this.disable();
  }


  showProcedureDialog(show: boolean) {
    this.procedureDialogVisible = show;
  }


  // abstract methods implementation

  protected createFormGroup(): FormGroup {
    // ToDo fix: this.formBuilder.group ... can't be used because
    // this method is called by super() constructor and
    // it executes before formBuilder is injected.

    return new FormGroup({

      name: new FormControl('', Validators.required),

      notes: new FormControl(),

      responsibleUID: new FormControl('', Validators.required),

      ragStatus: new FormControl('', Validators.required),

      targetDate: new FormControl(),

      dueDate: new FormControl(),

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
    return this.projectStore.deleteActivity(this.activity)
      .then(() => this.onClose())
      .catch(err => this.app.messageBox.showError(err).toPromise());
  }


  private getUpdateData() {
    const formModel = this.form.value;

    const data = {
      name: formModel.name,
      notes: formModel.notes,
      //tags: this.getSelectedTags(),
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

    //this.setActivityTags();
    this.cleanExceptions();
  }


  private updateActivity(): Promise<void> {

    const updateData = this.getUpdateData();

    return this.projectStore.updateActivity(this.activity, updateData)
      .then(() => this.onReset())
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


  private loadSelectedTags() {
    this.activity.tags.forEach(x => this.selectTag(x));

    this.selectedTags = this.tags.filter(x => x.selected === true);
  }


  private loadTags() {
    this.projectStore.tags
      .subscribe(x => {
        this.tags = x;
        this.tags.forEach(x => x.selected = false);
      });
  }


  private getSelectedTags() {
    return this.selectedTags.filter(x => x.selected === true)
      .map(x => x.name);
  }


  onSelectedTags(selectedTags: any) {
    this.selectedTags = selectedTags;
  }


  private setActivityTags() {
    this.activity.tags = this.selectedTags.filter(x => x.selected === true)
      .map(x => x.name);
  }


  private selectTag(tag: string) {
    const index = this.tags.findIndex(x => x.name === tag);

    if (index !== -1) {
      this.tags[index].selected = true;
    }
  }

}
