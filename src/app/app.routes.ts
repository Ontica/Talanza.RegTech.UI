import { Routes } from '@angular/router';
import { DataResolver } from './app.resolver';

import { HomeComponent } from './dashboard/home/home.component';
import { ProcessDefinitionComponent } from './workflow/modeling/process-definition.component';
import { NoContentComponent } from './shared/no-content/no-content.component';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'process-definition', component: ProcessDefinitionComponent },
  { path: '**', component: NoContentComponent }
];
