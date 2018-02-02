import { Injectable } from '@angular/core';

@Injectable()
export class ProjectSelectorService {

    private _selectedProjectUID = 'ed3de';//number =  2;

    set selectedProjectUID(value: string) {
        this._selectedProjectUID = value;
    }
    get selectedProjectUID(): string {
        return this._selectedProjectUID;
    }

}
