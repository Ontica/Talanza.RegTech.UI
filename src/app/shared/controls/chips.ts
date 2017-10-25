import { Component, Input } from '@angular/core';

@Component({
  selector: 'chips',
  templateUrl: './chips.html',
  styleUrls: ['./chips.scss']
})

export class Chips {
  @Input() items: any;
}