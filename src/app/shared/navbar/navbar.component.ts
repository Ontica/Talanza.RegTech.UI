/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, OnInit } from '@angular/core';

import { NavBarService } from './navbar.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],

})

export class NavbarComponent implements OnInit {
  
  public selectedOption: string = 'home';

  constructor(private navbarService: NavBarService) {}

  ngOnInit() {   
    this.selectedOption = this.navbarService.selectedOption;
  }

  public setSelectedStyle(option: string): void {  
    this.navbarService.selectedOption = option;      
  }

}
