/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input,
         OnChanges, OnInit, Output, OnDestroy } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable, of, BehaviorSubject } from 'rxjs';

import { ProjectTemplateStore } from '@app/store/project-template.store';
import { ProjectStore } from '@app/store/project.store';
import { ProcedureStore } from '@app/store/procedure.store';

import { ActivityTemplate, EmptyActivityTemplate } from '@app/models/project-management';
import { BaseProcedure, Entity } from '@app/models/regulation';

import { AbstractForm, MessageBoxService } from '@app/shared/services';


enum FormMessages {

  IncompleteActivityData =
  'Fields marked with red color are required.',

  UnrecognizedValue =
  'The field has an unrecognizable value.',

}

const ALL_ENTITIES = -1;

@Component({
  selector: 'emp-steps-activity-model-form',
  templateUrl: './activity-model-form.component.html',
  styleUrls: ['./activity-model-form.component.scss']
})
export class ActivityModelFormComponent extends AbstractForm implements OnInit, OnChanges, OnDestroy {

  @Output() templateDelete = new EventEmitter();
  @Output() templateChange = new EventEmitter<ActivityTemplate>();

  @Input() template = EmptyActivityTemplate;
  @Input() readonly = false;

  form: FormGroup;

  dueOnControllers: ActivityTemplate[] = [];

  entities: Observable<Entity[]> = of([]);
  procedures: Observable<BaseProcedure[]> = of([]);
  themesList: Observable<string[]> = of([]);

  selectedEntityIdSubject = new BehaviorSubject<number>(ALL_ENTITIES);

  constructor(private messageService: MessageBoxService,
              private projectStore: ProjectStore,
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
    this.themesList = this.projectStore.themes;
  }


  ngOnChanges() {
    if (!this.template) {
      this.template = EmptyActivityTemplate;
    }
    this.onReset();
    this.selectedEntityIdSubject.next(this.template.entity);
  }


  ngOnDestroy() {
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
    const msg = `This operation will delete the activity or obligation design ` +
                `<strong>${this.template.name}</strong> from this regulatory process.<br/><br/>` +
                `Do you want to delete this activity from the current process?`;

    this.messageService.confirm(msg, 'Delete activity design',
                                'DeleteCancel', 'Delete activity design').subscribe(
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


  setDefaultValuesForDueOnTermUnit() {
    if (this.form.value.dueOnTermUnit === 'NA') {
      this.setNotApplyDueOnTermFormControls();

    } else if (this.form.value.dueOnTermUnit !== 'NA') {
      this.changeFormValueToIfCurrentValueIs('dueOnCondition', 'NA', '');
      this.changeFormValueToIfCurrentValueIs('dueOnController', '-1', '');
      this.changeFormValueToIfCurrentValueIs('durationUnit', 'NA', '');

    }

  }


  setDefaultValuesForSectionActivityType() {
    if (this.form.value.activityType === 'Section') {
      this.set('executionMode', 'Timeline');
      this.set('isMandatory', false);
      this.set('dueOnTerm', '');
      this.set('dueOnTermUnit', 'NA');
      this.set('dueOnRuleAppliesForAllContracts', '');
      this.set('entity', '-1');
      this.set('procedure', '-1');
      this.setNotApplyDueOnTermFormControls();
    }
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
      notesForeignLang: new FormControl(''),

      theme: new FormControl(),

      activityType: new FormControl('', Validators.required),

      executionMode: new FormControl('', Validators.required),

      isMandatory: new FormControl('', Validators.required),

      isController: new FormControl('', Validators.required),


      dueOnTerm: new FormControl(),

      dueOnTermUnit: new FormControl('', Validators.required),

      dueOnCondition: new FormControl('', Validators.required),

      dueOnController: new FormControl('', Validators.required),

      dueOnRuleAppliesForAllContracts: new FormControl(''),


      duration: new FormControl(),

      durationUnit: new FormControl('', Validators.required),

      periodUnit: new FormControl(''),
      periodValue: new FormControl(''),
      periodDueOn: new FormControl(''),
      periodMonth: new FormControl(''),
      periodDayOfWeek: new FormControl(''),
      periodDay: new FormControl(''),
      periodNotes: new FormControl(),

      entity: new FormControl('', Validators.required),

      procedure: new FormControl('', Validators.required),

      contractClause: new FormControl(),
      contractClauseForeignLang: new FormControl(),

      legalBasis: new FormControl(),
      legalBasisForeignLang: new FormControl()

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


  private changeFormValueToIfCurrentValueIs(path: string, currentValue: any, newValue: any) {
    this.set(path, this.value(path) === currentValue ? newValue : this.value(path));
  }


  private deleteActivity(): Promise<void> {
    return this.templateStore.delete(this.template)
               .then(() => this.templateDelete.emit())
               .catch(err => this.messageService.showError(err).toPromise());
  }


  private getUpdateData() {
    const formModel = this.form.value;

    const periodicityRule = this.getPeriodicityRuleUpdateData();

    console.log('periodicityRule', periodicityRule);

    const data = {
      name: formModel.name,
      notes: formModel.notes,
      theme: formModel.theme,

      config: {

        activityType: formModel.activityType,
        executionMode: formModel.executionMode,
        isMandatory: formModel.isMandatory === 'true' ? true : false,
        isController: formModel.isController === 'true' ? true : false,

        dueOnTerm: formModel.dueOnTerm ? Number(formModel.dueOnTerm) : '',
        dueOnTermUnit: formModel.dueOnTermUnit,
        dueOnCondition: formModel.dueOnCondition,
        dueOnController: Number(formModel.dueOnController),
        dueOnRuleAppliesForAllContracts: formModel.dueOnRuleAppliesForAllContracts,

        duration: formModel.duration ? Number(formModel.duration) : '',
        durationUnit: formModel.durationUnit,

        periodicityRule,

        entity: Number(formModel.entity),
        procedure: Number(formModel.procedure),
        contractClause: formModel.contractClause || '',
        legalBasis: formModel.legalBasis || ''

      },

      foreignLang: {
        name: formModel.nameForeignLang,
        notes: formModel.notesForeignLang,
        contractClause: formModel.contractClauseForeignLang,
        legalBasis: formModel.legalBasisForeignLang
      }

    };

    return data;
  }


  getPeriodicityRuleUpdateData() {
    if (this.value('executionMode') !== 'Periodic') {
      return null;
    }

    var periodicityRule = {
      notes: this.form.get('periodNotes').value,
      each: {
        value: this.form.get('periodValue').value,
        unit: this.form.get('periodUnit').value
      }
    };

    if (!this.showControl('periodDueOn')) {
      return periodicityRule;
    }

    var dueOn = {
      type: this.form.get('periodDueOn').value
    };

    if (this.showControl('periodMonth')) {
      dueOn = {...dueOn, ...{ month: this.form.get('periodMonth').value }};
    }

    if (this.showControl('periodDayOfWeek')) {
      dueOn = {...dueOn, ...{ dayOfWeek: this.form.get('periodDayOfWeek').value }};
    }

    if (this.showControl('periodDay')) {
      dueOn = {...dueOn, ...{ day: this.form.get('periodDay').value }};
    }

    return {...periodicityRule, ... { dueOn }};
  }


  appliesPeriodDueOnOption(periodDueOn: string) {
    const periodUnit = this.form.get('periodUnit').value;
    const periodValue = this.form.get('periodValue').value;

    switch (periodDueOn) {
      case 'OnFixedDate':
        return periodUnit === 'Years' || (periodUnit === 'Months' && periodValue > 1);

      case 'OnFixedDayOfWeek':
        return periodUnit === 'Weeks';

      case 'OnFirstCalendarDays':
        return periodUnit === 'Years' || (periodUnit === 'Months' && periodValue === 1);

      case 'OnFirstBusinessDays':
        return periodUnit === 'Years' || periodUnit === 'Months';

      default:
        return true;
    }
  }


  showControl(controlName: string) {
    const periodUnit = this.form.get('periodUnit').value;
    const periodValue = this.form.get('periodValue').value;
    const periodDueOn = this.form.get('periodDueOn').value;

    if (!controlName || !periodUnit) {
      return false;
    }

    if (periodUnit === 'Manual') {
      return false;
    }

    if (periodDueOn === '' && controlName != 'periodDueOn') {
      return false;
    }

    switch(controlName)  {
      case 'periodDueOn':
        return periodUnit !== 'CalendarDays';

      case 'periodMonth':
        return (periodUnit === 'Years' || (periodUnit === 'Months' && periodValue > 1)) && (periodDueOn === 'OnFixedDate');

      case 'periodDayOfWeek':
        return periodUnit === 'Weeks' && periodDueOn !== 'AfterTheGivenStep';

      case 'periodDay':
        return periodUnit !== 'CalendarDays' && periodUnit !== 'Weeks' && periodDueOn !== 'AfterTheGivenStep';

      default:
        return true;
    }
  }


  private isPositiveInteger(str: string) {
    const n = Number(str);

    return n !== Infinity && Number.isInteger(n) && n > 0;
  }


  private rebuildForm() {
    this.form.reset({
      name: this.template.name,
      nameForeignLang: this.template.foreignLanguage.name,

      notes: this.template.notes,
      notesForeignLang: this.template.foreignLanguage.notes,

      theme: this.template.theme,

      activityType: this.template.activityType,
      executionMode: this.template.executionMode,
      isMandatory: this.template.isMandatory ? 'true' : 'false',
      isController: this.template.isController ? 'true' : 'false',

      dueOnTerm: this.template.dueOnTerm,
      dueOnTermUnit: this.template.dueOnTermUnit,
      dueOnCondition: this.template.dueOnCondition,
      dueOnController: this.template.dueOnController,
      dueOnRuleAppliesForAllContracts: this.template.dueOnRuleAppliesForAllContracts,

      duration: this.template.duration,
      durationUnit: this.template.durationUnit,

      periodUnit: this.template.periodicityRule?.each?.unit,
      periodValue: this.template.periodicityRule?.each?.value,
      periodDueOn: this.template.periodicityRule?.dueOn?.type,
      periodMonth: this.template.periodicityRule?.dueOn?.month,
      periodDayOfWeek: this.template.periodicityRule?.dueOn?.dayOfWeek,
      periodDay: this.template.periodicityRule?.dueOn?.day,
      periodNotes: this.template.periodicityRule?.notes,

      entity: this.template.entity,
      procedure: this.template.procedure,

      contractClause: this.template.contractClause,
      contractClauseForeignLang: this.template.foreignLanguage.contractClause,

      legalBasis: this.template.legalBasis,
      legalBasisForeignLang: this.template.foreignLanguage.legalBasis

    });

    this.cleanExceptions();
  }


  private setNotApplyDueOnTermFormControls() {
    this.set('dueOnCondition', 'NA');
    this.set('dueOnController', '-1');
    this.set('dueOnRuleAppliesForAllContracts', '');

    this.set('durationUnit', 'NA');
    this.set('dueOnTerm', '');
    this.set('duration', '');
  }


  private updateActivity(): Promise<void> {
    const updateData = this.getUpdateData();

    return this.templateStore.update(this.template, updateData)
               .then(x => {
                  this.template = x;
                  this.onReset();
                })
               .catch(err => this.messageService.showError(err).toPromise());
  }


  private validateFormFields(): void {
    this.validateIntegerValue('dueOnTerm');
    this.validateIntegerValue('duration');
    this.validateIntegerValue('periodValue');
    this.validateIntegerValue('periodDay');
    this.validatePeriodicity();
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


  private validatePeriodicity() {
    if (this.value('executionMode') !== 'Periodic') {
      return;
    }

    if (!this.value('periodUnit')) {
      this.addException('The periodicity rule is incomplete.');
      this.get('periodUnit').markAsDirty();

      return;
    }

    if (this.value('periodUnit') === 'Manual') {
      this.set('periodValue', '');

      return;
    }

    if (!this.value('periodValue')) {
      this.addException('The periodicity rule is incomplete.');
      this.get('periodValue').markAsDirty();

      return;
    }


    if (!this.showControl('periodDueOn')) {
      return;
    }

    if (!this.value('periodDueOn')) {
      this.addException('The periodicity rule is incomplete.');
      this.get('periodDueOn').markAsDirty();
    }

    if (!this.appliesPeriodDueOnOption(this.value('periodDueOn'))) {
      this.addException('The periodicity rule is incomplete.');
      this.set('periodDueOn', '');
      this.get('periodDueOn').markAsDirty();
    }

    if (this.showControl('periodMonth') && !this.value('periodMonth')) {
      this.addException('The periodicity rule is incomplete.');
      this.get('periodMonth').markAsDirty();
    }


    if (this.showControl('periodDay') && !this.value('periodDay')) {
      this.addException('The periodicity rule is incomplete.');
      this.get('periodDay').markAsDirty();
    }


    if (this.showControl('periodDayOfWeek') && !this.value('periodDayOfWeek')) {
      this.addException('The periodicity rule is incomplete.');
      this.get('periodDayOfWeek').markAsDirty();
    }
  }

  // these methods must be handled through component input data (architecture concern)


  private loadDueOnControllers() {
    this.dueOnControllers =
      this.templateStore.activities().filter((x) => x.isController &&
                                                    x.uid !== this.template.uid)
                                     .sort((t, s) => t.name.localeCompare(s.name));
  }

}
