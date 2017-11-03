import { Component, Input } from '@angular/core';

@Component({
  selector: 'chips',
  templateUrl: './chips.html',
  styleUrls: ['./chips.scss']
})

export class Chips {

  @Input() items: any;

  public deleteItem(item: string): void {   
    let index =  this.items.findIndex((x) => x.name === item);    
    this.items[index].selected = false; 
  }
  
}