import { Component } from '@angular/core';

@Component({
  selector: 'related-procedures-tab',
  templateUrl: './related-procedures-tab.component.html',
  styleUrls: ['./related-procedures-tab.component.scss']
})

export class RelatedProceduresTabComponent {

  public isVisibleAddProcedureEditor = false;

  public onShowAddProcedureEditor(): void {
    this.isVisibleAddProcedureEditor = true;
  }

  public cancelAddProcedure(): void {
    this.isVisibleAddProcedureEditor = false;
  }

}
