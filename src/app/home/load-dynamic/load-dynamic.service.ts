/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Injectable }           from '@angular/core';

import { SearchPartComponent } from '../parts/search-part.component';
import { BinnaclePartComponent } from '../parts/binnacle-part.component';
import { ChatPartComponent } from '../parts/chat-part.component';
import { ProjectsStatusPartComponent } from '../parts/projects-status-part.component';
import { TodoListPartComponent } from '../parts/todo-list-part.component';
import { NewsPartComponent } from '../parts/news-part.component';

import { DynamicComponent } from './dynamic-component';

@Injectable()
export class LoadDynamicService {
    getDynamcComponents() {
        return [
          new DynamicComponent( SearchPartComponent, 'SearchPartComponent',{}),
          new DynamicComponent( BinnaclePartComponent, 'BinnaclePartComponent', {}),
          new DynamicComponent( ChatPartComponent, 'ChatPartComponent', {}),
          new DynamicComponent( ProjectsStatusPartComponent, 'ProjectsStatusPartComponent', {}),
          new DynamicComponent( TodoListPartComponent, 'TodoListPartComponent', {}),
          new DynamicComponent( NewsPartComponent,'NewsPartComponent', {}),             
        ];
      }
}

