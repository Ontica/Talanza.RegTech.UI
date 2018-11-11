/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, EventEmitter, HostBinding, Output } from '@angular/core';

@Component({
  selector: 'process-activity-association',
  templateUrl: './process-activity-association.component.html',
  styleUrls: ['./process-activity-association.component.scss']
})
export class ProcessActivityAssociationComponent {

  @Output() onCancelEvent = new EventEmitter();

  @HostBinding('style.display') private display = 'block';
  @HostBinding('style.position') private position = 'absolute';

  cancel(): void {
    this.close();
  }

  private close(): void {
    this.onCancelEvent.emit();
  }

}
