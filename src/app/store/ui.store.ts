/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { UserInterfaceService } from '@app/services/user.interface.service';

import { DefaultNavigationHeader, DefaultProjectViewConfig,
         NavigationHeader, ProjectViewConfig, LayoutType, } from '@app/models/user-interface';


@Injectable()
export class UserInterfaceStore {

  private _layoutType: BehaviorSubject<LayoutType> = new BehaviorSubject<LayoutType>('Home');

  private _currentView: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private _navigationHeader:
                BehaviorSubject<NavigationHeader> = new BehaviorSubject(DefaultNavigationHeader);

  private _selectedView: BehaviorSubject<ProjectViewConfig> = new BehaviorSubject(DefaultProjectViewConfig);


  constructor(private uiService: UserInterfaceService) {
    this.loadInitialData();
  }


  // select methods

  get currentView(): Observable<string> {
    return this._currentView.asObservable();
  }


  get layoutType(): Observable<LayoutType> {
    return this._layoutType.asObservable();
  }


  get navigationHeader(): Observable<NavigationHeader> {
    return this._navigationHeader.asObservable();
  }


  get projectViewConfig(): Observable<ProjectViewConfig> {
    return this._selectedView.asObservable();
  }


  // reduce methods


  setCurrentView(viewName: string) {
    if (this._currentView.value !== viewName) {
      this._currentView.next(viewName);
    }
  }


  setLayoutType(value: LayoutType) {
    if (this._layoutType.value !== value) {
      this._layoutType.next(value);
    }
  }


  setMainTitle(newTitle: string) {
    const newHeader = Object.assign({}, this._navigationHeader.value, { title: newTitle });

    this.setNavigationHeader(newHeader);
  }


  setNavigationHeader(value: NavigationHeader) {
    this._navigationHeader.next(value);
  }


  setProjectViewConfig(viewConfig: ProjectViewConfig) {
    this._selectedView.next(viewConfig);
  }


  // private methods


  private loadInitialData() {

  }

}
