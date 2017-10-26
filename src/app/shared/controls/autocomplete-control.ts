import {
  Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
  
@Component({
  selector: 'autocomplete-control',
  host: {
    '(document:click)': 'handleClick($event)'
  },
  templateUrl: './autocomplete-control.html',
  styleUrls: ['./autocomplete-control.scss']
})

export class AutocompleteControl {

  public filteredList = [];
  public selectedItems = [];
  public items : any[] = [];

  public query = "";
  public elementRef: any;
  
  public isHideControl = false;
  public isAddFlag = false;

  public _tags : any;
  @Input() 
  set tags(tags: any) {
    this._tags  = tags;
    this.loadItems();
  }
  get tags(): any {
    return this._tags;
  }

  @Input() isWritable: boolean = true;
  
  @Output() public selected = new EventEmitter<string[]>();

  constructor(myElement: ElementRef) {
    this.elementRef = myElement;
  }
 
  public filter(): void {
    if (this.query !== "") {
      this.filteredList = this.items.filter(function (el) {
        return el.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
      }.bind(this));
      if (this.filteredList.length === 0) {
        this.isAddFlag = true;
      } else {
        this.isAddFlag = false;
      }
    } else {
      this.filteredList = [];
    }
  }

  public addItem(): void {
    //save to api
    let newItem : Object = {
      name: this.query, value: true
    }
    this.items.push(newItem);
    this.AddSelectedItem(newItem);   
    this.selected.emit(this.selectedItems);
   
    this.isAddFlag = false;
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
      this.isHideControl = true;
    }
  }

  public onSelectItem(selectedItem: any): void {
    this.updateItem(selectedItem.name, true);
    this.AddSelectedItem(selectedItem);   
    this.selected.emit(this.selectedItems);
  }

  public onUnselectItem(selectedItem: any): void {
    this.updateItem(selectedItem.name, false);
    this.deleteSelectedItem(selectedItem);    
    this.selected.emit(this.selectedItems);
  }

  private deleteSelectedItem(selectedItem: any): void {
    let index = this.selectedItems.findIndex((x) => x.name === selectedItem.name);
    this.selectedItems.splice(index, 1);
  }

  private AddSelectedItem(selectedItem: any): void {
    this.selectedItems.push(selectedItem);
  }

  private loadItems(): void {    
    this.items = [];    
    this.tags.forEach((obj, i) => {         
         obj.value = false;
         this.items[i] = obj;
    });   
    
  }

  private updateItem(selectedItemName: string, value: boolean): void {
    let index = this.items.findIndex((x) => x.name === selectedItemName);
    this.items[index].value = value;
  }

  public onClick(): void {
    this.query = '';
    this.filteredList = this.items;
    this.isHideControl = false;
  }

}
