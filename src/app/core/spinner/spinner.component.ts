import { Component, OnDestroy, OnInit, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LoggerService } from '../general/logger.service';
import { SpinnerState, SpinnerService } from './spinner.service';

@Component({
  selector: 'toh-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnDestroy, OnInit {

@HostBinding('style.display') public display = 'block';
@HostBinding('style.position') public position = 'absolute';

  public visible = false;
  private spinnerStateChanged: Subscription;

  constructor(private loggerService: LoggerService,
              private spinnerService: SpinnerService) {

  }

  public ngOnInit() {   

    this.spinnerStateChanged = this.spinnerService.spinnerState
      .subscribe((state: SpinnerState) => {
        this.visible = state.show;
      
      });
  }

  public ngOnDestroy() {
    this.spinnerStateChanged.unsubscribe();
  }

}
