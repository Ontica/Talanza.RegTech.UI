/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, OnInit, AfterViewInit, ViewChild, 
        ComponentFactoryResolver, OnDestroy, Input } from '@angular/core';
import { LoadDynamicService } from './load-dynamic.service';

import { DynamicComponent } from './dynamic-component';
import { LoadDynamicDirective } from './load-dynamic.directive';

@Component({
    selector: 'load-dynamic-component',
    template: '<ng-template ad-host></ng-template>',

})

export class LoadDynamicComponent implements OnInit {
   
    components: DynamicComponent[];
    @ViewChild(LoadDynamicDirective) adHost: LoadDynamicDirective;
 
    @Input() name: string = '';

    constructor(private loadDynamicService: LoadDynamicService,
                private componentFactoryResolver: ComponentFactoryResolver) { }
    
    ngOnInit() {
        this.components = this.loadDynamicService.getDynamcComponents();
    }

    ngAfterViewInit() {
        this.loadComponent();       
    }

    public loadComponent(): void {       
        let selectedComponent =  this.components.find(x => x.name === this.name) //this.components[this.componentNumber];

        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(selectedComponent.component);

        let viewContainerRef = this.adHost.viewContainerRef;
        viewContainerRef.clear();

        let componentRef = viewContainerRef.createComponent(componentFactory);
        //(<AdComponent>componentRef.instance).data = adItem.data;
    }

}
