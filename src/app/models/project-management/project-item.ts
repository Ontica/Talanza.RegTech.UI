/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Activity } from './activity';
import { Task } from './task';


export type ProjectItem = Activity | Task;

export type ProjectItemStatus = 'Incomplete' | 'Completed' | 'All tasks';
