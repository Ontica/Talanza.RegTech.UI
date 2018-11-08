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

import { Activity, EmptyActivity } from '@app/models/project-management';
import { Procedure } from '@app/models/regulation';

import { CardSettings } from '@app/models/user-interface';


@Component({
  selector: 'activity-designer',
  templateUrl: './activity-designer.component.html',
  styleUrls: ['./activity-designer.component.scss']
})
export class ActivityDesignerComponent implements OnChanges {

  procedure: Observable<Procedure> = null;

  @Output() close = new EventEmitter();
  @Output() update = new EventEmitter<Activity>();

  @Input() activity = EmptyActivity;
  @Input() settings = new CardSettings();

  constructor(private store: ProcedureStore) { }

  ngOnChanges() {
    if (!this.activity) {
      this.activity = EmptyActivity;
      this.procedure = null;
      return;
    }
    if (this.hasProcedure) {
      this.procedure = this.store.getProcedure(this.activity.config.procedure);
    }
  }


  onClose() {
    this.close.emit();
  }


  onDeleteActivity() {
    this.onClose();
  }


  onUpdateActivity() {
    this.update.emit(this.activity);
  }


  get hasProcedure() {
    return (this.activity.config && this.activity.config.procedure !== -1);
  }

}
