import {
    Component, ElementRef, EventEmitter, Input, Output
} from '@angular/core';


@Component({
    selector: 'select-control',
    host: {
        '(document:click)': 'handleClick($event)'
    },
    templateUrl: './select-control.html',
    styleUrls: ['./select-control.scss']
})

export class SelectControl {

    public isHideControl = false;
    public selectedItem: any;
    public elementRef: any;

    private _items: any[];
    @Input()
    set items(items: any[]) {
        this._items = items;
        this.setSelectedItem(items[0]);
    }
    get items(): any[] {
        return this._items;
    }

    private _selectedUID: string;
    @Input()
    set selectedUID(selectedUID: string) {
        this._selectedUID = selectedUID;

        let selectedItem = this.items.find((x) => x.uid === selectedUID);
        this.setSelectedItem(selectedItem);
    }
    get selectedUID(): string {
        return this._selectedUID;
    }

    @Input() config: any = { valueField: 'name' }

    @Output() public onSelectedItem = new EventEmitter<string>();

    constructor(myElement: ElementRef) {
        this.elementRef = myElement;
    }

    public onClick(): void {
        this.isHideControl = !this.isHideControl;
    }

    public onSelectItem(item: any): void {
        this.selectedItem = item;
        this.isHideControl = !this.isHideControl;
        this.onSelectedItem.emit(this.selectedItem);
    }

    public handleClick(event): void {
        let clickedComponent = event.target;
        let inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);
        if (!inside) {
            this.isHideControl = false;
            // this.isHideControl = true;
        }
    }

    public setItemCSSClass(level: number): string {
        switch (level) {
            case 0:
                return 'item-level0';

            case 1:
                return 'item-level1';

            case 2:
                return 'item-level2';

            case 3:
                return 'item-level3';

            default:
                return 'item-level3';
        }
    }

    private setSelectedItem(item: any): void {
        this.selectedItem = item;
    }
}
