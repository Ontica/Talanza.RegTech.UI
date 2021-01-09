/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input,
         OnChanges, Output } from '@angular/core';
import { Observable } from 'rxjs';

import { ProcedureStore } from '@app/store/procedure.store';

import { ActivityTemplate, EmptyActivityTemplate } from '@app/models/project-management';
import { Procedure } from '@app/models/regulation';

import { CardSettings } from '@app/shared/common-models';


@Component({
  selector: 'emp-steps-activity-designer',
  templateUrl: './activity-designer.component.html',
  styleUrls: ['./activity-designer.component.scss']
})
export class ActivityDesignerComponent implements OnChanges {

  procedure: Observable<Procedure> = null;

  @Output() activityDesignerClose = new EventEmitter();
  @Output() activityTemplateChange = new EventEmitter<ActivityTemplate>();

  @Input() activityTemplate = EmptyActivityTemplate;
  @Input() useForeignLanguage = false;
  @Input() settings = new CardSettings();


  constructor(private store: ProcedureStore) { }

  ngOnChanges() {
    if (!this.activityTemplate) {
      this.activityTemplate = EmptyActivityTemplate;
      this.procedure = null;
      return;
    }
    if (this.hasProcedure) {
      this.procedure = this.getProcedure();
    } else {
      this.procedure = null;
    }
  }


  get activityTemplateName() {
    if (this.useForeignLanguage) {
      return this.activityTemplate.foreignLanguage.name || this.activityTemplate.name;
    } else {
      return this.activityTemplate.name;
    }
  }


  onClose() {
    this.activityDesignerClose.emit();
  }


  onDelete() {
    this.onClose();
  }


  onUpdate() {
    this.activityTemplateChange.emit(this.activityTemplate);
  }


  get hasProcedure() {
    return (this.activityTemplate && this.activityTemplate.procedure !== -1);
  }


  private getProcedure(): Observable<Procedure> {
    return this.store.getProcedure(this.activityTemplate.procedure);
  }

}
