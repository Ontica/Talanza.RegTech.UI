/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, Input, OnChanges } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Exception } from '@app/core';
import { EventInfo } from '@app/core/data-types';

import { ProjectItem } from '@app/models/project-management';
import { DataObject } from '@app/models/data-objects';
import { StepRequirement } from '@app/models/steps';

import { DataObjectsService } from '@app/services/data-objects';


@Component({
  selector: 'emp-steps-step-data-configuration',
  templateUrl: './step-data-configuration.component.html',
  styleUrls: ['../../../styles/general-styles.scss']
})
export class StepDataConfigurationComponent implements OnChanges {

  @Input() step: ProjectItem;

  @Input() readonly = false;

  requirementsList: Observable<StepRequirement[]> = of([]);

  displayRequirementEditor = false;
  selectedRequirement: StepRequirement;

  constructor(private service: DataObjectsService) {}

  ngOnChanges() {
    this.loadStepRequirements();
  }

  hideEditor() {
    this.displayRequirementEditor = false;
  }

  linkRequirement(requirement: StepRequirement) {
    this.selectedRequirement = null;
    this.displayRequirementEditor = false;

    this.service.addStepRequirement(this.step, requirement)
        .then(() => this.loadStepRequirements());
  }

  showRequirementEditor() {
    this.displayRequirementEditor = true;
  }


  onRequirementsListEvent(event: EventInfo) {
    switch (event.type) {
      case 'selectRequirement':
        this.showStepDataObjectDesigner(event.payload.requirement);
        return;

      case 'deleteRequirement':
        this.removeRequirement(event.payload.requirement);
        return;

      default:
        throw new Exception(`Unrecognized event type ${event.type}`);
    }
  }


  // private methods

  private loadStepRequirements() {
    this.requirementsList = this.service.getStepRequirements(this.step);
  }


  private removeRequirement(requirement: StepRequirement) {
    if (!confirm(`¿Do you want to remove this requirement ${requirement.name}?`)) {
      return;
    }
    this.service.removeRequirement(requirement)
                .then(() => this.loadStepRequirements());
  }


  private showStepDataObjectDesigner(dataObject: DataObject) {
    // this.selectedRequirement = dataObject;
    this.displayRequirementEditor = true;
  }

}
