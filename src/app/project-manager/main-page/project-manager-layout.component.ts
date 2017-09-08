import { Component, HostListener, OnInit } from '@angular/core';

declare var dhtmlXTreeView: any;
declare var myTreeView: any;

@Component({
  selector:'project-manager',
 
  templateUrl: './project-manager-layout.component.html',
  styleUrls: ['./project-manager-layout.component.scss']

})

export class ProjectManagerLayoutComponent implements OnInit {

  public screenSize = 0;
  public navigationBarHeight = 38;
  public isMapVisible = false; 
  public height: number = 0;  

  public projectPath = '';
  public selectedView = 'task-list-view';
  private responsibleItem = '';

  private mainHeaderBarHeight = 120;
  
  constructor() {
    this.screenSize = window.innerHeight - this.mainHeaderBarHeight;
  }

  ngOnInit() {  
    this.height = this.screenSize - this.navigationBarHeight;              
  }

  public displayMap(): void {
    this.isMapVisible = !this.isMapVisible;
    if (!this.isMapVisible) {
      this.height =  (this.screenSize -  this.navigationBarHeight);     
    } else {
      this.height = (this.screenSize -  this.navigationBarHeight) / 2;      
    }
  }  

  public setSelectedPath(path: string): void {
    this.projectPath = path;
  }

  public setResponsibleItem(selectedResponsible: string): void {
    this.responsibleItem = '>>' + selectedResponsible;
  }

  public onChangeView(selectedView: string): void {
    this.selectedView = selectedView;    
  }

}