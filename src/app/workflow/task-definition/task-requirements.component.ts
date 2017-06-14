/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import {  ChangeDetectorRef, Component } from '@angular/core';

@Component ({
  selector: 'task-requirements',
  templateUrl: './task-requirements.component.html',
  styleUrls: ['task-requirements.component.scss']
})

export class TaskRequirementsComponent {

  public requirementEditorIsActive = false;

  public constructor(private ref: ChangeDetectorRef) {}

  public addRequirement(): void {
    this.requirementEditorIsActive = true;
    this.ref.detectChanges();
  }

  public cancel(): void {
    this.requirementEditorIsActive = false;
    this.ref.detectChanges();
  }

}