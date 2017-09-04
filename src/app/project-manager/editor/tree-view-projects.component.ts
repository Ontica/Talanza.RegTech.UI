import { Component, OnInit  } from '@angular/core';

declare var dhtmlXTreeView: any;
declare var myTreeView: any;

@Component({
  selector: 'tree-view-projects',
  template: '<div id="tree_here"></div>',
  styles: [`div#tree_here {
    position: relative;
    border: 1px solid #dfdfdf;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.09);
    width: 220px;
    height: 280px;
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

  ngOnInit() {
   var myTreeView = new dhtmlXTreeView({
      parent: "tree_here",
      items: this.jsonExample,
    });
   
  }


}