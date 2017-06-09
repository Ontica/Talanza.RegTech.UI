import { Component, EventEmitter, HostBinding, Output } from '@angular/core';

@Component({
  selector: 'diagram-task-editor',
  templateUrl: './diagram-task-editor.component.html',
  styleUrls: ['diagram-task-editor.component.css']
})

export class DiagramTaskEditorComponent {

  @HostBinding('style.display') private display = 'block';
  @HostBinding('style.position') private position = 'absolute';

  @Output() public onCancelEvent = new EventEmitter();

  public cancel(): void {
    this.closePopup();
  }

  private closePopup(): void {
    this.onCancelEvent.emit();
  }

}
