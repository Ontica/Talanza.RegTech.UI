import  { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})

export class KanbanComponent implements OnInit {

    private _height: number = 0;
    @Input() 
    set height(height: number) {
        this._height = height - 27;

    }
    get height(): number {        
        return this._height;
    }
    
    constructor (private elementRef: ElementRef ){

    }

    ngOnInit() {
       // this.
       

    }   

    public allowDrop(ev: any): void {
        ev.preventDefault();
    }

    public  drag(ev:any): void { 
    console.log("ev" , ev);
        ev.dataTransfer.setData("text", ev.target.id);
    }

    public drop(ev:any): void {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text");
        console.log("el valor de data " , data);
        ev.target.appendChild(document.getElementById(data));
    }
/*
    public setTableHeight(): string {
        switch(this.kanbanSizeClass) {
            case 'full': return 'full-height';
            case 'middle': return 'middle-height';
            default: return 'full-height';
        }
    }*/

}