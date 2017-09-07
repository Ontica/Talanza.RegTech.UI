/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

declare var dhtmlXTreeView: any;
declare var myTreeView: any;

@Component({
  selector: 'tree-view-projects',
  template: '<div id="tree_here"></div>',
  styles: [`div#tree_here {
    position: relative;
    border: 1px solid #dfdfdf;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.09);
    min-width: 40%;
    width: 100%;
    height: 270px;
    min-height: 100px;
    margin-left: 20px;
    margin-bottom: 20px;
  }`]

})
export class TreeViewProjectsComponent implements OnInit {

  private jsonExample = [
    {id: 1, text: "Cuenca Salina A4", open: 1, items: [
      {id: 5, text: "Comunes", items: [      
        {id: 3, text: "Pozo Alfa 19"},  
      ]},
      {id: 6, text: "Campo Alfa", open: 1, items: [
        {id: 19, text: "Pozo Alfa 19"},
        {id: 20, text: "Pozo Alfa 33"},        
      ]},
      {id: 7, text: "Campo Beta", items: [
        {id: 24, text: "Pozo Beta 45"},
        {id: 25, text: "Pozo Beta 49"},
        {id: 26, text: "Pozo Beta 78"},        
      ]}
    ]},
    {id: 2, text: "Cuenca Salina A5", items: [
      {id: 28, text: "Pozo Beta 78"},  
    ]}
    
  ];

  @Output() selectetId: EventEmitter<number> = new EventEmitter<number>();
  @Output() selectedPath: EventEmitter<string> = new EventEmitter<string>();

  private path = '';
  private treeView: any; 
  private separator = '>>';

  ngOnInit() {
    
    let myTreeView = new dhtmlXTreeView({
      parent: "tree_here",
      items: this.jsonExample,
    }); 

    this.treeView = myTreeView;

     myTreeView.attachEvent("onClick", (id) => {
       this.setSelectedId(id);
       this.setSelectedPath(id);
       return true;
  });
  
  }

  public setSelectedId(id): void {    
    this.selectetId.emit(id);
  }

  public setSelectedPath(id:number): void {
    this.path = "";
    this.setPath(id);
    this.reverse();
    this.selectedPath.emit(this.path);
  }

  private setPath(id: number): void {      
   if (this.treeView.getLevel(id) !== 1) {
     this.path += this.treeView.getItemText(id) + this.separator;
     id =  this.treeView.getParentId(id);
     this.setPath(id);
    } else {
      this.path += this.treeView.getItemText(id);
    }
   
  }

  private reverse() {
   this.path = this.path.split(this.separator).reverse().join(this.separator);    
  }
 
}
