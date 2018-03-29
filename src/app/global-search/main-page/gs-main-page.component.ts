import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProcedureService } from '../../procedures/services/procedure.service';

import { SmallProcedureInterface } from '../../procedures/data-types/small-procedure.interface';
import { ProcedureFilter } from '../../procedures/data-types/procedure-filter';
import { NavBarConfig } from '../../controls/nav-bar/nav-bar.control';

@Component({
    selector: 'global-search',
    templateUrl: './gs-main-page.component.html',
    styleUrls: ['./gs-main-page.component.scss'],

})

export class GlobalSearchMainPageComponent {   
 
    public procedures: SmallProcedureInterface[] = [];
    public selectedProcedureUID = '';
    public navBarConfig: NavBarConfig[] = [];
    public selectedOption = '';

    public masterContainer = 'centered-container';  
    public isDetailsContainerVisible = false;

    
    private _keywords = '';    
    @Input()
    set keywords(keywords: string) {        
        this._keywords = keywords;
        
        this.main();
    }
    get keywords(): string {
        return this._keywords;
    }

    @Output() public onClose = new EventEmitter();
    
    constructor(private route: ActivatedRoute, private procedureService: ProcedureService) {
        this.route.params.subscribe(params => {
            this.keywords = params['keywords'];
             this.main();     
         });
    }  

    public selectOption(option: string) {        
        this.selectedOption = option;    
    }

    public selectProcedure(procedureUID: string): void {  
        this.selectedProcedureUID = procedureUID;      
        this.masterContainer = 'block-container';
        this.isDetailsContainerVisible = true;
    }

    public closeDetailsContainer(): void {      
        this.masterContainer = 'centered-container';
        this.isDetailsContainerVisible = false;        
    }

    public closeGlobalSearch(): void {        
        this.onClose.emit();
    }


    private async main() {  
        this.closeDetailsContainer();      
        await this.loadProcedures(); 
        this.fillNavBar();         
    }  

    private fillNavBar(): void {
        this.navBarConfig = [];
        this.navBarConfig.push({ name:'procedures', displayText:'Trámites (' + this.procedures.length.toString() +')'});
    }

    private cleanSelectedOption(): void {
        this.selectedOption = '';
    }

    private async loadProcedures() {
        let filter: ProcedureFilter = new ProcedureFilter(); 
        filter.keywords = this.keywords;

       await this.procedureService.getProceduresList(filter)
                         .then((procedures) =>{this.procedures = procedures;});
    }  

     
}
