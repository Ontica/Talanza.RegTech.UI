/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */


export type LayoutType = 'Home' | 'Projects' | 'Processes' | 'Library' | 'Search';


export const DefaultProjectViewConfig: ProjectViewConfig = {
    viewType: 'treeView',
    timeScaleUnit: 'quarter'
};


export class ProjectViewConfig {
  viewType: string;
  timeScaleUnit: string;
}
