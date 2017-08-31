import  { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss']
})

export class KanbanComponent implements OnInit {

constructor (private elementRef: ElementRef ){}

ngOnInit(){
  let el = this.elementRef.nativeElement;

 /* el.addEventListener('dragenter', (e) => {
    el.classList.add('over');
  });

  el.addEventListener('dragover', (e) => {
    if (e.preventDefault) {
      e.preventDefault();
    }
    el.dataTransfer.setData("text", el.target.id);
    e.dataTransfer.dropEffect = 'move';
    return false;
  });

  el.addEventListener('drop', (e) => {
    if (e.stopPropagation) {
      e.stopPropagation(); // Stops some browsers from redirecting.
    }
    
    el.classList.remove('over');
    let data = JSON.parse(e.dataTransfer.getData('text'));
    console.log("value " + data);
    el.target.appendChild(document.getElementById(data));
    return false;
  })*/
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