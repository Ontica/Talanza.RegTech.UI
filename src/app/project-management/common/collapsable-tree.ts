/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Identifiable, isEmpty } from '@app/models/core';


export interface TreeNode extends Identifiable {
  parent: Identifiable;
}


export type CollapsableTreeNodeDisplayMode = 'collapsed' | 'expanded' | 'leaf' | undefined;


export class CollapsableTree {

  constructor(private allNodes: TreeNode[], private collapsedNodes: string[]) { }

  nodeDisplayMode(activity: TreeNode): CollapsableTreeNodeDisplayMode {
    if (this.hasCollapsedAncestor(activity)) {
      return undefined;
    }

    const collapsed = this.isCollapsed(activity);

    if (collapsed) {
      return 'collapsed';
    } else if (this.hasChildren(activity)) {
      return 'expanded';
    } else {
      return 'leaf';
    }
  }


  toggleCollapse(activity: Identifiable) {
    const index = this.collapsedNodes.indexOf(activity.uid);

    if (index >= 0) {
      this.collapsedNodes.splice(index, 1);
    } else {
      this.collapsedNodes.push(activity.uid);
    }
  }


  private hasChildren(activity: Identifiable): boolean {
    return this.allNodes.find(x => x.parent.uid === activity.uid) ? true : false;
  }


  private hasCollapsedAncestor(activity: TreeNode): boolean {
    let parent = activity.parent;

    while (true) {
      if (isEmpty(parent)) {
        return false;
      } else if (this.isCollapsed(parent)) {
        return true;
      } else {
        parent = this.allNodes.find(x => x.uid === parent.uid).parent;
      }
    }
  }


  private isCollapsed(item: Identifiable): boolean {
    return this.collapsedNodes.indexOf(item.uid) >= 0;
  }

}
