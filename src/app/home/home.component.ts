/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, OnInit } from '@angular/core';

import { UserInterfaceStore } from '@app/store/ui.store';

import { NavigationHeader, MenuItem } from '@app/models/user-interface';


@Component({
  selector: 'emp-ng-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private uiStore: UserInterfaceStore) { }

  ngOnInit() {
    this.setNavigationHeader();
  }


  // private methods


  private setNavigationHeader() {
    const header: NavigationHeader = {
      title: 'Home page',
      hint: 'Contract management',
      mainMenu: [
        new MenuItem('My Tasks', undefined, '/home/my-tasks', false),
        new MenuItem('Timelines', undefined, '/home/timelines', false),
        new MenuItem('Documents', undefined, '/home/documents', false)
      ]
    };

    this.uiStore.setNavigationHeader(header);
  }

}
