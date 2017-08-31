import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector:'project-manager',
 
  templateUrl: './project-manager-layout.component.html',
  styleUrls: ['./project-manager-layout.component.scss']

})

export class ProjectManagerLayoutComponent implements OnInit {

  
  public leftPanelWidth = 20;
  public screenSize = 80;
  public isHideLeftPanel = false;
  
  ngOnInit() {
   
  }


  public hideLeftPanel(): void {  
    
    this.isHideLeftPanel = !this.isHideLeftPanel;  
    if (this.isHideLeftPanel) {
      this.screenSize = 100;
    }  else {
     this.screenSize = 80;
    }
    
  }


}