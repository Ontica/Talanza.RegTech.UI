/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit } from '@angular/core';

import { MenuItem } from '../nav-menu/nav-menu.component';


@Component({
  selector: 'navigation-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavigationHeaderComponent implements OnInit {

  title = 'Salina Area 28';

  breadcrumb = 'Proyecto regulatorio Shell Ronda 2.4';

  mainMenuItems: MenuItem[];
  // = 'Actividades &nbsp; &nbsp; | &nbsp; &nbsp; Documentos &nbsp; &nbsp; | &nbsp; &nbsp; Q&A &nbsp; &nbsp;'

  secondaryMenuItems: MenuItem[];
  // = `Árbol &nbsp; &nbsp; | &nbsp; &nbsp; Lista &nbsp; &nbsp; | &nbsp; &nbsp; Gantt &nbsp; &nbsp; |
  //                      &nbsp; &nbsp; Kanban &nbsp; &nbsp; | &nbsp; &nbsp; Calendario &nbsp; &nbsp;`;
  constructor() { }

  ngOnInit() {

    this.mainMenuItems =  [
      new MenuItem('Actividades'),
      new MenuItem('Documentos'),
      new MenuItem('Q&A'),
    ];

    this.secondaryMenuItems =  [
      new MenuItem('Árbol'),
      new MenuItem('Lista'),
      new MenuItem('Gantt'),
      new MenuItem('Kanban'),
      new MenuItem('Calendario')
    ];

  }

  onSelectMainMenuItem(menuItem: MenuItem) {

  }

  onSelectSecondaryMenuItem(menuItem: MenuItem) {

  }

}
