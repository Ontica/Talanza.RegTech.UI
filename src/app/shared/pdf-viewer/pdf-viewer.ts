import { Component, Input } from '@angular/core';

@Component({
  selector: 'emp-ng-pdf-viewer',
  template: '<object class="object-viewer" [data]="documentURI | safeUrl"></object>',
  styles: [
    `
    .object-viewer {
        height: 100%;
        width: 100%;
     }
     `
  ]
})

export class PdfViewer {

  @Input() documentURI = '';

}
