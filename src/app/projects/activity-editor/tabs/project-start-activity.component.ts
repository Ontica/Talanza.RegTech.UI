/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { Component } from '@angular/core';

@Component({
  selector: 'project-start-activity',
  templateUrl: './project-start-activity.component.html',
  styleUrls: ['./project-start-activity.component.scss'],
})

export class ProjectStartActivityComponent {

  public isEnableActivityStateOption = false;

  public onClickStartActivity(): void {
    this.isEnableActivityStateOption = true;
  }
}