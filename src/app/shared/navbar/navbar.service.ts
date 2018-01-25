import { Injectable } from '@angular/core';

@Injectable()
export class NavBarService {

  private _selectedOption: string = 'home';

  set selectedOption(value: string) {
    this._selectedOption = value;
  }
  get selectedOption(): string {
    return this._selectedOption;
  }
  
}
