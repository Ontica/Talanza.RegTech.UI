/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input,
         OnChanges, OnInit, Output, OnDestroy } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable, of, BehaviorSubject, combineLatest } from 'rxjs';

import { ProjectTemplateStore } from '@app/store/project-template.store';
import { ProcedureStore } from '@app/store/procedure.store';

import { ActivityTemplate, EmptyActivityTemplate } from '@app/models/project-management';
import { BaseProcedure, Entity } from '@app/models/regulation';

import { AbstractForm, MessageBoxService } from '@app/shared/services';

enum FormMessages {

  IncompleteActivityData =
  'Los campos marcados en rojo son requeridos.',

  UnrecognizedValue =
  'El campo tiene un valor que no reconozco.',

}

const ALL_ENTITIES = -1;

@Component({
  selector: 'emp-steps-activity-model-form',
  templateUrl: './activity-model-form.component.html',
  styleUrls: ['./activity-model-form.component.scss']
})
export class ActivityModelFormComponent extends AbstractForm implements OnInit, OnChanges, OnDestroy {

  @Output() delete = new EventEmitter();
  @Output() update = new EventEmitter<ActivityTemplate>();

  @Input() activity = EmptyActivityTemplate;
  @Input() readonly = false;

  form: FormGroup;

  dueOnControllers: ActivityTemplate[] = [];

  entities: Observable<Entity[]> = of([]);
  procedures: Observable<BaseProcedure[]> = of([]);
  selectedEntityIdSubject = new BehaviorSubject<number>(ALL_ENTITIES);

  constructor(private messageService: MessageBoxService,
              private templateStore: ProjectTemplateStore,
              private procedureStore: ProcedureStore) {
    super();
  }


  get Msg(): typeof FormMessages {
    return FormMessages;
  }


  ngOnInit() {
    this.entities = this.procedureStore.entities();
    this.procedures = this.procedureStore.getProceduresFilteredByEntityId(this.selectedEntityIdSubject);
  }


  ngOnChanges() {
    if (!this.activity) {
      this.activity = EmptyActivityTemplate;
    }
    this.onReset();
    this.selectedEntityIdSubject.next(this.activity.entity);
  }


  ngOnDestroy(): void {
    this.selectedEntityIdSubject.unsubscribe();
  }


  onChangeEntity(entityId: string) {
    if (!entityId || +entityId < 1) {
      this.selectedEntityIdSubject.next(ALL_ENTITIES);
    } else {
      this.selectedEntityIdSubject.next(+entityId);
    }
  }


  onDelete() {
    const msg = `Esta operación eliminará la obligación ` +
                `<strong>${this.activity.name}</strong> de este árbol de diseño de obligaciones.<br/><br/>` +
                `¿Elimino la obligación de este diseño?`;

    this.messageService.confirm(msg, 'Eliminar obligación',
                                'DeleteCancel', 'Eliminar esta obligación').subscribe(
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
    return this.templateStore.delete(this.activity)
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
        dueOnController: Number(formModel.dueOnController),

        duration: formModel.duration ? Number(formModel.duration) : '',
        durationUnit: formModel.durationUnit,
        periodicity: formModel.periodicity || '',

        entity: Number(formModel.entity),
        procedure: Number(formModel.procedure),
        contractClause: formModel.contractClause || '',
        legalBasis: formModel.legalBasis || '',
      },
    };

    return data;
  }


  private rebuildForm() {
    this.form.reset({
      name: this.activity.name,
      notes: this.activity.notes,

      activityType: this.activity.activityType,
      executionMode: this.activity.executionMode,
      isMandatory: this.activity.isMandatory ? 'true' : 'false',
      isController: this.activity.isController ? 'true' : 'false',

      dueOnTerm: this.activity.dueOnTerm,
      dueOnTermUnit: this.activity.dueOnTermUnit,
      dueOnCondition: this.activity.dueOnCondition,
      dueOnController: this.activity.dueOnController,

      duration: this.activity.duration,
      durationUnit: this.activity.durationUnit,
      periodicity: this.activity.periodicity,

      entity: this.activity.entity,
      procedure: this.activity.procedure,
      contractClause: this.activity.contractClause,
      legalBasis: this.activity.legalBasis,
    });

    this.cleanExceptions();
  }


  private updateActivity(): Promise<void> {
    const updateData = this.getUpdateData();

    return this.templateStore.update(this.activity, updateData)
               .then(() => this.onReset())
               .catch(err => this.messageService.showError(err).toPromise());
  }

  private isPositiveInteger(str: string) {
    const n = Number(str);

    return n !== Infinity && Number.isInteger(n) && n > 0;
  }


  private validateIntegerValue(path: string): void {
    const value = this.value(path);

    if (!value) {
      return;
    }

    if (!this.isPositiveInteger(value)) {
      this.addException(FormMessages.UnrecognizedValue + 'Value ' + value);
      this.get(path).markAsDirty();
    }
  }


  private validateFormFields(): void {
    this.validateIntegerValue('dueOnTerm');
    this.validateIntegerValue('duration');
  }


  // these methods must be handled through component input data (architecture concern)


  private loadDueOnControllers() {
    this.dueOnControllers =
      this.templateStore.activities().filter((x) => x.isController &&
                                                    x.uid !== this.activity.uid);
  }

}
