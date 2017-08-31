import  { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})

export class KanbanComponent implements OnInit {

constructor (private elementRef: ElementRef ){}

ngOnInit(){
 
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

}