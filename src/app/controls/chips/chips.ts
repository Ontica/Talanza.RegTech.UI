import { Component, Input } from '@angular/core';

@Component({
  selector: 'emp-ng-chips',
  templateUrl: './chips.html',
  styleUrls: ['./chips.scss']
})

export class Chips {

  @Input() items: any;

  removeTag(tag: string): void {
    const index = this.items.findIndex((x) => x.name === tag);

    this.items[index].selected = false;
  }

}
