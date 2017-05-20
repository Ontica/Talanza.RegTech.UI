import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LoggerService } from '../general/logger.service';
import { SpinnerState, SpinnerService } from './spinner.service';

@Component({
  selector: 'toh-spinner',
  templateUrl: './spinner.component.html'
})
export class SpinnerComponent implements OnDestroy, OnInit {

  public visible = false;
  private spinnerStateChanged: Subscription;

  constructor(private loggerService: LoggerService,
              private spinnerService: SpinnerService) {

  }

  public ngOnInit() {
    console.log(this.visible);

    this.spinnerStateChanged = this.spinnerService.spinnerState
      .subscribe((state: SpinnerState) => {
        this.visible = state.show;
        this.loggerService.log(`visible=${this.visible}`);
      });
  }

  public ngOnDestroy() {
    this.spinnerStateChanged.unsubscribe();
  }

}
