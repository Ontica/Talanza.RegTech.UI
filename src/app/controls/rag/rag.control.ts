import { Component, Input } from '@angular/core';

@Component({
  selector: 'rag-control',
  template:'<div class="circle" [ngClass]="statusClass"></div>',  
  styleUrls:['./rag.control.scss']
})

export class RAGControl {
  
  private _status: string = '';
  @Input() 
    set status(status: string ) {
      this._status = status;
      this.setStatusClass();      
    }
    get status(): string {
      return this._status;
    }

  public statusClass = '';

  private setStatusClass(): void {

    switch (this.status) {
      case 'Red' : this.statusClass = 'red'; break;
      case 'Orange' : this.statusClass = 'orange'; break;
      case 'Ambar' : this.statusClass = 'ambar'; break;     
      case 'Green' : this.statusClass ='green'; break;
    }    

  }

}
