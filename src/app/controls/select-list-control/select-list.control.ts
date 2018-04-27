import { Component, ElementRef, EventEmitter,
         Input, Output } from '@angular/core';
    
  @Component({
    selector: 'select-list',
    host: {
      '(document:click)': 'handleClick($event)'
    },
    templateUrl: './select-list.control.html',
    styleUrls: ['./select-list.control.scss']
  })
  
  export class SelectListControl {
  
    public isHideControl = false;
    
    public elementRef: any;

    @Input() items: string[];
    @Output() selectedItem =  new EventEmitter<string>();
    
    constructor(myElement: ElementRef) {
        this.elementRef = myElement;
    }

    public onClick(): void {        
        this.isHideControl = !this.isHideControl;
    }

    public onSelectItem(item: any): void {
        this.selectedItem.emit(item);

        this.isHideControl = !this.isHideControl;        
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
/*
    private setSelectedItem(item: string): void {
        this.selectedItem = item;
    }
*/
}