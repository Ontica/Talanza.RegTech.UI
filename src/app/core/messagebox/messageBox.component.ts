import { Component, OnDestroy, OnInit, HostBinding } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LoggerService } from '../general/logger.service';
import { MessageBox, MessageBoxService } from './messageBox.service';

@Component({
  selector: 'messagebox',
  templateUrl: './messageBox.component.html',
  styleUrls: ['./messageBox.component.scss']
})
export class MessageBoxComponent implements OnDestroy, OnInit {

@HostBinding('style.display') public display = 'block';
@HostBinding('style.position') public position = 'absolute';

  public visible = false;
  public message: string = '';
  public title: string = '';
  public confirmWindow: boolean = false;
  private messageBoxChanged: Subscription;


  constructor(private loggerService: LoggerService,
              private messageBoxService: MessageBoxService) {

  }

  public ngOnInit() {

    this.messageBoxChanged = this.messageBoxService.messageBoxState
      .subscribe((state) => {
        this.visible = state.show;
        this.message = state.message;
        this.title = state.title;
        this.confirmWindow = state.confirmWindow;
      });

  }

  public ngOnDestroy() {
    this.messageBoxChanged.unsubscribe();
  }

  public accept(): void {
    this.confirm(true);

    this.hide();
  }

  public close(): void {
    this.confirm(false);

    this.hide();
  }

  private confirm(option: boolean): void {
    if (this.confirmWindow) {
      this.messageBoxService.confirmResult = option;
    }
  }

  private hide(): void {
    this.visible = false;
  }


}
