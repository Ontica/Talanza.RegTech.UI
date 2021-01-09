/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';

import { Assertion, Exception, SessionService } from '@app/core';

import { AbstractPresentationHandler, StateValues } from '@app/core/presentation/presentation.handler';

import {
  DefaultNavigationHeader, DefaultView, Layout,
  NavigationHeader, View, buildNavigationHeader, DefaultSidebarValues,
} from '@app/views/main-layout/common-models';

import { APP_LAYOUTS, APP_VIEWS } from '@app/views/main-layout/config-data';


export enum ActionType {
  SET_CURRENT_VIEW_FROM_URL = 'Empiria.UI-Item.MainUserInterface.Action.SetCurrentViewFromUrl',
  SET_IS_PROCESSING_FLAG    = 'Empiria.UI-Item.MainUserInterface.Action.SetIsProcessingFlag',
  SET_MAIN_TITLE            = 'Empiria.UI-Item.MainUserInterface.Action.SetMainTitle',
  SET_SIDEBAR_VALUES        = 'Empiria.UI-Item.MainUserInterface.Action.SetSidebarValues',
  TOGGLE_FOREIGN_LANGUAGE   = 'Empiria.UI-Item.MainUserInterface.Action.ToggleForeignLanguage',
}


export enum SelectorType {
  LAYOUT = 'Empiria.UI-Item.MainUserInterface.Selector.Layout',
  NAVIGATION_HEADER = 'Empiria.UI-Item.MainUserInterface.Selector.NavigationHeader',
  SIDEBAR_VALUES = 'Empiria.UI-Item.MainUserInterface.Selector.SidebarValues',
  CURRENT_VIEW = 'Empiria.UI-Item.MainUserInterface.Selector.CurrentView',
  IS_PROCESSING = 'Empiria.UI-Item.MainUserInterface.Selector.IsProcessing',
  REPORTING_TOOLS = 'Empiria.UI-Item.MainUserInterface.Selector.ReportingTools',
  USE_FOREIGN_LANGUAGE = 'Empiria.UI-Item.MainUserInterface.Selector.UseForeignLanguage',
}


export interface MainLayoutState {
  readonly layout: Layout;
  readonly navigationHeader: NavigationHeader;
  readonly currentView: View;
  readonly isProcessing: boolean;
  readonly useForeignLanguage: boolean;
}


const initialState: StateValues = [
  { key: SelectorType.LAYOUT, value: APP_LAYOUTS[0] },
  { key: SelectorType.NAVIGATION_HEADER, value: DefaultNavigationHeader },
  { key: SelectorType.SIDEBAR_VALUES, value: DefaultSidebarValues },
  { key: SelectorType.CURRENT_VIEW, value: DefaultView },
  { key: SelectorType.IS_PROCESSING, value: false },
  { key: SelectorType.REPORTING_TOOLS, value: false },
  { key: SelectorType.USE_FOREIGN_LANGUAGE, value: false },
];


@Injectable()
export class MainLayoutPresentationHandler extends AbstractPresentationHandler {

  constructor(private service: SessionService) {
    super({
      initialState,
      selectors: SelectorType,
      actions: ActionType
    });
    this.loadApplicationSettings();
  }


  get state(): MainLayoutState {
    return {
      layout: this.getValue(SelectorType.LAYOUT),
      navigationHeader: this.getValue(SelectorType.NAVIGATION_HEADER),
      currentView: this.getValue(SelectorType.CURRENT_VIEW),
      isProcessing: this.getValue(SelectorType.IS_PROCESSING),
      useForeignLanguage: this.getValue(SelectorType.USE_FOREIGN_LANGUAGE),
    };
  }

  dispatch(actionType: ActionType, payload?: any): void {
    switch (actionType) {

      case ActionType.SET_IS_PROCESSING_FLAG:
        Assertion.assert(typeof payload === 'boolean', `${actionType} payload must be a boolean value.`);

        this.setValue(SelectorType.IS_PROCESSING, payload);

        return;

      case ActionType.SET_MAIN_TITLE:
        Assertion.assert(typeof payload === 'string', `${actionType} payload must be a string value.`);

        this.setMainTitle(payload);

        return;

      case ActionType.SET_SIDEBAR_VALUES:
        this.setValue(SelectorType.SIDEBAR_VALUES, payload);

        return;

      case ActionType.SET_CURRENT_VIEW_FROM_URL:
        Assertion.assertValue(payload.url, 'payload.url');

        this.setCurrentViewFromUrl(payload.url);

        return;

      case ActionType.TOGGLE_FOREIGN_LANGUAGE:
        const newValue = !super.getValue<boolean>(SelectorType.USE_FOREIGN_LANGUAGE);

        this.setValue(SelectorType.USE_FOREIGN_LANGUAGE, newValue);

        return;

      default:
        throw this.unhandledCommandOrActionType(actionType);
    }
  }

  // private methods

  private getViewLayout(view: View): Layout {
    for (const layout of APP_LAYOUTS) {
      if (layout.views.includes(view)) {
        return layout;
      }
    }
    throw Assertion.assertNoReachThisCode(`Unregistered view ${view.name}.`);
  }


  private loadApplicationSettings() {
    this.service.getSettings()
      .then(x =>
        super.setValue(SelectorType.REPORTING_TOOLS, x.get<boolean>('REPORTING_TOOLS'))
      );
  }


  private setCurrentViewFromUrl(url: string) {
    if (this.state.currentView.url !== url) {
      const view = APP_VIEWS.find(x => x.url === url);

      if (!view) {
        throw new Exception(`Unregistered view with url '${url}'.`);
      }

      const viewLayout = this.getViewLayout(view);

      if (this.state.layout !== viewLayout) {
        this.setLayout(viewLayout);
      }

      this.setNavigationHeader(view);

      this.setValue(SelectorType.CURRENT_VIEW, view);
    }
  }

  private setLayout(value: Layout) {
    if (this.state.layout !== value) {
      this.setValue(SelectorType.LAYOUT, value);
    }
  }

  private setMainTitle(newTitle: string) {
    const newHeader = Object.assign({},
                          super.getValue<NavigationHeader | View>(SelectorType.NAVIGATION_HEADER),
                          { title: newTitle });
    this.setNavigationHeader(newHeader);
  }

  private setNavigationHeader(value: NavigationHeader | View) {
    if (value && 'url' in value) {
      const layout = APP_LAYOUTS.find(x => x.name === this.state.layout.name);

      const navHeader = buildNavigationHeader(layout, value.title);

      this.setValue(SelectorType.NAVIGATION_HEADER, navHeader);

    } else if (value) {
      this.setValue(SelectorType.NAVIGATION_HEADER, value as NavigationHeader);
    }
  }

}
