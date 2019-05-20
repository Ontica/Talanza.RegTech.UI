import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'emp-ng-card',
  templateUrl: './card.component.html',
  styleUrls: ['./../../../styles/card.scss']
})
export class CardComponent {

  @Input() title = 'Card title';

  @Input() hint = 'Card hint';

  @Input() disableClose = false;

  @Output() close = new EventEmitter<void>();


  onClose() {
    this.close.emit();
  }

}
