/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, EventEmitter, OnInit, Output  } from '@angular/core';

declare var dhtmlXTreeView: any;

@Component({
  selector: 'tree-view-responsibles',
  template: '<div id="tree_responsibles"></div>',
  styles: [`div#tree_responsibles {
    position: relative;
    border: 1px solid #dfdfdf;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.09);
    min-width: 40%;
    width: 100%;
    height: 170px;
    min-height: 100px;
    margin-left: 20px;
    margin-bottom: 20px;
  }`]

})
export class TreeViewResponsiblesComponent implements OnInit {
  private responsiblesList= [
    {
      id: 1,
      text: "Sierra",
      open: 1,
      items: [{
        id: 3,
        text: "Juan R."
      }, {
        id: 4,
        text: "Leticia G."
      }, {
        id: 5,
        text: "Hugo H."
      }],

    }, {
      id: 2,
      text: "Talos",
      open: 0,
      items: [{
        id: 7,
        text: "Antonio E."
      }, {
        id: 8,
        text: "María A."
      }, {
        id: 9,
        text: "Mónica C."
      }]
    }
  ];

  @Output() onSelectetId: EventEmitter<number> = new EventEmitter<number>();
  @Output() onSelectedItem: EventEmitter<string> = new EventEmitter<string>();

  private path = '';
  private treeView: any; 
    
  ngOnInit() {  
    this.doOnLoad();
  }

  public doOnLoad() {
       
    let treeViewResposibles = new dhtmlXTreeView({
      parent: "tree_responsibles",
      items: this.responsiblesList,
    });

    this.treeView = treeViewResposibles;

    treeViewResposibles.attachEvent("onClick", (id) => {
      this.setSelectedId(id);
      this.setSelectedItem(id);
      return true;
    });

  }

  public setSelectedId(id): void {   
    this.onSelectetId.emit(id);
  }

  public setSelectedItem(id:number): void {     
    this.onSelectedItem.emit(this.treeView.getItemText(id));
  }  
  
}
