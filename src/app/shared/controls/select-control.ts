import { 
    Component, ElementRef, EventEmitter, Input,  Output } from '@angular/core';


@Component({
    selector:'select-control',
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

    public _items : any;
    @Input() 
    set items(items: any) {
    this._items  = items;
    
    this.setSelectedItem(items[0]);
    }
    get items(): any {
        return this._items;
    }

    @Input() config: object =  { valueField: 'name' }

    @Output() public onSelectedItem = new EventEmitter<string>();

    constructor(myElement: ElementRef) {
        this.elementRef = myElement;
    }

    public onClick(): void {
        this.isHideControl = !this.isHideControl;
    }

    public onSelectItem(item: any): void {
        this.selectedItem = item;
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

    private setSelectedItem(item: any): void {
        this.selectedItem = item;
    }
}
