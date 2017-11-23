import { Injectable } from '@angular/core';

@Injectable()
export class NavBarService {

  private _selectedOption: string = 'projects';

  set selectedOption(value: string) {
    this._selectedOption = value;
  }
  get selectedOption(): string {
    return this._selectedOption;
  }
  
}
