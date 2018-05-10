import { Component, EventEmitter, HostBinding, Output } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'viewer',
  template: `
    <div class="editor-container editor-container-style">
    <div class="header">
      <div class="close-button right-position" (click)="onClose()">&times;</div>
      <div class="title">Agregar actividad al proyecto: <b></b></div>
      <div class="subtitle">Proyecto el dorado </div>
    </div>
    <div class="iframe-container">
      <!--<iframe #modeler   class="iframe"  [src]=" url "></iframe>-->
      <embed src="https://www.gob.mx/asea" width=100% height=100% />
    </div>
    </div>
  `,
  styleUrls: ['./gantt-viewer.component.scss']
})
export class GanttViewerComponent {

  @HostBinding('style.display') public display = 'block';
  @HostBinding('style.position') public position = 'absolute';

  @Output() public onCloseEvent = new EventEmitter();

  public url: SafeResourceUrl;

  public constructor(private sanitizer: DomSanitizer) {

    this.url = this.sanitizer.bypassSecurityTrustResourceUrl('https://github.com/');
             
  }

  public onClose(): void {
    this.onCloseEvent.emit();
  }

  /*
  <div class="iframe-container">
  <iframe #modeler scrolling="no" [class.readonly-modeler]="!editionMode" class="iframe-modeler" [src]=" url "></iframe>
</div>
*/
}