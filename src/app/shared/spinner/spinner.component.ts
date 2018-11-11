/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnDestroy, OnInit, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs';

import { SpinnerState, SpinnerService } from './spinner.service';


@Component({
  selector: 'emp-ng-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnDestroy, OnInit {

  @HostBinding('style.display') display = 'block';
  @HostBinding('style.position') position = 'absolute';

  private spinnerStateChanged: Subscription;

  visible = false;

  constructor(private spinnerService: SpinnerService) {

  }

  ngOnInit() {
    this.spinnerStateChanged = this.spinnerService.spinnerState
                                   .subscribe((state: SpinnerState) => this.visible = state.show );
  }

  ngOnDestroy() {
    this.spinnerStateChanged.unsubscribe();
  }

}
