import { Component } from '@angular/core';

@Component({
  selector: 'main-layout',
  templateUrl: 'main-layout.component.html',
  styleUrls: ['main-layout.component.scss']
})
export class MainLayoutComponent {
  public userName = 'UserName || et al';
  public title = 'Definición de procesos';
  public breadcrumb = 'Inicio » Procesos » Definiciones';
}
