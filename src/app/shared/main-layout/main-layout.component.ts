/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component } from '@angular/core';

import { SessionService } from '../../core';

export const PROJECTS: any[] = [
  { id: 0,  name: 'Todos los proyectos', level:0 },
  { id: 1,  name: 'Ronda 2.2', level: 1 },
  { id: 2,  name: 'Pozo Tampico', level:2 },
  { id: 3,  name: 'Pozo Salvatierra', level:3 },
  { id: 1,  name: 'Ronda 2.3', level: 1 },
  { id: 2,  name: 'Pozo Tabasco', level:2 },
  { id: 3,  name: 'Pozo cd del Carmen', level:3 },
]


@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  public userName = 'UserName || et al';
  public title = 'Administración y control del cumplimiento regulatorio';
  public breadcrumb = '';

  public projects = PROJECTS;

  // public title = 'Administración y control del cumplimiento regulatorio';
  // Cajón de arena para jugar

  public constructor(private session: SessionService) {
    const principal = session.getPrincipal();

    this.userName = principal.identity.fullname;
  }
  
  public onChangeProject(project: any): void {
    // TO DO
  }

}
