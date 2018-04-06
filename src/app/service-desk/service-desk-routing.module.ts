/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

 import { NgModule } from '@angular/core';
 import { RouterModule, Router } from '@angular/router';

 import { SecurityGuardService } from '../core';

 import { MainLayoutComponent } from '../shared';

 import { ServiceDeskMainPageComponent } from './main-page/service-desk-main-page.component';

 @NgModule({
     imports: [
         RouterModule.forChild([
             {
                 path:'service-desk', component:MainLayoutComponent , canActivate: [SecurityGuardService],
                 children: [{path: 'search', component: ServiceDeskMainPageComponent }]
             }
         ])],
    exports: [RouterModule]     
 })
 
 export class ServiceDeskRoutingModule {}