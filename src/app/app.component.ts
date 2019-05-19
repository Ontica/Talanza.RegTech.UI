import { Component, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
  selector: 'emp-ng-root',
  encapsulation: ViewEncapsulation.None,
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

  ngOnInit(): void {

    window.addEventListener('dragover', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'none';
    }, false);

    window.addEventListener('drop', e => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'none';
    }, false);

  }

}
