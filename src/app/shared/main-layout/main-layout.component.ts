/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; 

import { SessionService } from '../../core';

@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  public userName = 'UserName || et al';
  public title = 'Administración y control del cumplimiento regulatorio';
  public breadcrumb = '';

  public isGlobalSearchVisible = false;
  public keywords = '';

  // public title = 'Administración y control del cumplimiento regulatorio';
  // Cajón de arena para jugar

  public constructor(private session: SessionService,
                     private router: Router,
                     private location: Location) {
    const principal = session.getPrincipal();

    this.userName = principal.identity.fullname;
  }

  public globalSearch(keywords: string): void {  
    this.isGlobalSearchVisible = true;     
   
    this.keywords = keywords;   
  }

  public hideGlobalSearch(): void {    
    this.isGlobalSearchVisible = false; 
  }

}
