import { Component } from '@angular/core';

@Component({
  selector: 'main-page',
  templateUrl:'./new-layout.component.html',
  styleUrls:['./new-layout.component.scss']
})

export class NewLayoutComponent {
  public selectedOption: string = 'home';
  
  public setSelectedStyle(option: string): void {  
    this.selectedOption =    option;   
  }
  
}