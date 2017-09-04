import { Component, OnInit  } from '@angular/core';

declare var dhtmlXTreeView: any;

@Component({
  selector: 'tree-view-responsibles',
  template: '<div id="tree_responsibles"></div>',
  styles: [`div#tree_responsibles {
    position: relative;
    border: 1px solid #dfdfdf;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.09);
    width: 280px;
    height: 180px;
    margin-left: 20px;
    margin-bottom: 20px;
  }`]

})
export class TreeViewResponsiblesComponent implements OnInit {
 
  ngOnInit() {  
    this.doOnLoad();
  }

  public doOnLoad() {
  let  treeViewResposibles = new dhtmlXTreeView({
      parent: "tree_responsibles",
      items: [{
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
      }],
    });
  }


}