/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Identifiable, DateString } from '../../core/data-types';
import { MediaFile } from '../knowledge-base';
import { ProjectItem } from './project-item';


export interface ProjectItemFile {
  uid: string;
  postingTime: DateString;
  postedBy: Identifiable;

  projectItem: ProjectItem;

  mediaFile: MediaFile;
}
