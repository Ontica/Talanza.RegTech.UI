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

import { ProjectTemplateStore } from '@app/store/project-template.store';

import { Activity, Activity_Empty } from '@app/models/project-management';
import { Entity } from '@app/models/procedures/entity';
import { Procedure } from '@app/models/procedures/procedure';


import { AbstractForm, MessageBoxService } from '@app/shared/services';


enum FormMessages {

  IncompleteActivityData =
  "Los campos marcados en rojo son requeridos.",

  UnrecognizedValue =
  "El campo tiene un valor que no reconozco.",

}


@Component({
  selector: 'activity-model-form',
  templateUrl: './activity-model-form.component.html',
  styleUrls: ['./activity-model-form.component.scss']
})
export class ActivityModelFormComponent extends AbstractForm implements OnInit, OnChanges {

  @Output() delete = new EventEmitter();
  @Output() update = new EventEmitter<Activity>();

  @Input() activity: Activity = Activity_Empty;

  form: FormGroup;

  dueOnControllers: Activity[] = [];
  entities: Observable<Entity[]> = of([]);
  procedures: Observable<Procedure[]> = of([]);

  constructor(private messageService: MessageBoxService,
              private templateStore: ProjectTemplateStore) {
    super();
  }


  get Msg(): typeof FormMessages {
    return FormMessages;
  }


  ngOnChanges() {
    if (!this.activity) {
      this.activity = Activity_Empty;
    }

    this.onReset();
  }


  ngOnInit() {
    this.loadCatalogues();
  }


  onClose() {

  }

  onDelete() {
    const msg = `Esta operación eliminará la obligación ` +
                `<strong>${this.activity.name}</strong> de este árbol de diseño de obligaciones.<br/><br/>` +
                `¿Elimino la obligación de este diseño?`;

    this.messageService.confirm(msg, "Eliminar obligación", 'DeleteCancel', 'Eliminar esta obligación').subscribe(
      result => {
        if (result) {
          this.setCommand('delete');
          this.onSubmit({ skipFormValidation: true });
        }
      }
    );
  }

  onReset() {
    this.rebuildForm();

    this.loadDueOnControllers();

    this.disable();
  }


  // abstract methods implementation

  protected createFormGroup(): FormGroup {
    // ToDo fix: this.formBuilder.group ... can't be used because
    // this method is called by super() constructor and
    // it executes before formBuilder is injected.

    return new FormGroup({

      name: new FormControl('', Validators.required),

      notes: new FormControl(),

      activityType: new FormControl('', Validators.required),

      executionMode: new FormControl('', Validators.required),

      isMandatory: new FormControl('', Validators.required),

      isController: new FormControl('', Validators.required),


      dueOnTerm: new FormControl(),

      dueOnTermUnit: new FormControl('', Validators.required),

      dueOnCondition: new FormControl('', Validators.required),

      dueOnController: new FormControl('', Validators.required),


      duration: new FormControl(),

      durationUnit: new FormControl('', Validators.required),

      periodicity: new FormControl(),

      entity: new FormControl('', Validators.required),

      procedure: new FormControl('', Validators.required),

      contractClause: new FormControl(),

      legalBasis: new FormControl(),

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

    this.validateFormFields();

    return Promise.resolve();
  }


  // private methods

  private deleteActivity(): Promise<void> {
    return this.templateStore.deleteActivity(this.activity)
               .then(() => this.delete.emit())
               .catch(err => this.messageService.showError(err).toPromise());
  }


  private getUpdateData() {
    const formModel = this.form.value;

    const data = {
      name: formModel.name,
      notes: formModel.notes,

      config: {

        activityType: formModel.activityType,
        executionMode: formModel.executionMode,
        isMandatory: formModel.isMandatory === 'true' ? true : false,
        isController: formModel.isController === 'true' ? true : false,

        dueOnTerm: formModel.dueOnTerm ? Number(formModel.dueOnTerm) : '',
        dueOnTermUnit: formModel.dueOnTermUnit,
        dueOnCondition: formModel.dueOnCondition,
        dueOnController: new Number(formModel.dueOnController),

        duration: formModel.duration ? Number(formModel.duration) : '',
        durationUnit: formModel.durationUnit,
        periodicity: formModel.periodicity || '',

        entity: new Number(formModel.entity),
        procedure: new Number(formModel.procedure),
        contractClause: formModel.contractClause || '',
        legalBasis: formModel.legalBasis || '',
      },
    };

    return data;
  }


  private rebuildForm() {
    const config = this.activity.config;

    this.form.reset({
      name: this.activity.name,
      notes: this.activity.notes,

      activityType: config.activityType,
      executionMode: config.executionMode,
      isMandatory: config.isMandatory ? 'true' : 'false',
      isController: config.isController ? 'true' : 'false',

      dueOnTerm: config.dueOnTerm,
      dueOnTermUnit: config.dueOnTermUnit,
      dueOnCondition: config.dueOnCondition,
      dueOnController: config.dueOnController,

      duration: config.duration,
      durationUnit: config.durationUnit,
      periodicity: config.periodicity,

      entity: config.entity,
      procedure: config.procedure,
      contractClause: config.contractClause,
      legalBasis: config.legalBasis,
    });

    this.cleanExceptions();
  }


  private updateActivity(): Promise<void> {

    const updateData = this.getUpdateData();

    return this.templateStore.updateActivity(this.activity, updateData)
               .then(() => this.onReset())
               .catch(err => this.messageService.showError(err).toPromise());
  }

  private isPositiveInteger(str: string) {
    var n = Number(str);

    return n !== Infinity && Number.isInteger(n) && n > 0;
  }


  private validateIntegerValue(path: string): void {
    const value = this.value(path);

    if (!value) {
      return;
    }

    if (!this.isPositiveInteger(value)) {
      this.addException(FormMessages.UnrecognizedValue + "Value " + value);
      this.get(path).markAsDirty();
    }
  }


  private validateFormFields(): void {
    this.validateIntegerValue('dueOnTerm');
    this.validateIntegerValue('duration');
  }


  // these methods must be handled through component input data (architecture concern)

  private loadCatalogues() {
    this.loadEntities();
    this.loadProcedures();
  }


  private loadEntities() {
    this.entities = this.templateStore.entities();
  }


  private loadProcedures() {
    this.procedures = this.templateStore.procedures();
  }


  private loadDueOnControllers() {
    this.dueOnControllers =
      this.templateStore.activities().filter((x) => x.config && x.config.isController &&
                                                    x.uid !== this.activity.uid);
  }

}
