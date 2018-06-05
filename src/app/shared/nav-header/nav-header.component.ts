/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navigation-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavigationHeaderComponent {

  title = 'Salina Area 28';
  breadcrumb = 'Proyecto regulatorio Shell Ronda 2.4';
  mainMenu = 'Actividades &nbsp; &nbsp; | &nbsp; &nbsp; Documentos &nbsp; &nbsp; | &nbsp; &nbsp; Q&A &nbsp; &nbsp;'
  secondaryMenu = `Árbol &nbsp; &nbsp; | &nbsp; &nbsp; Gantt &nbsp; &nbsp; |
                   &nbsp; &nbsp; Kanban &nbsp; &nbsp; | &nbsp; &nbsp; Calendario &nbsp; &nbsp;`;
  constructor() { }

}
