/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Assertion, CoreService } from '@app/core';

import { MediaMetadata, MediaFile } from '@app/models/knowledge-base';

import { ProjectItem, Project, ProjectItemFile } from '@app/models/project-management';


@Injectable()
export class ProjectFilesService {


  constructor(private core: CoreService) { }


  getAllFiles(): Observable<ProjectItemFile[]> {
    const path = `v1/project-management/files`;

    return this.core.http.get<ProjectItemFile[]>(path);
  }


  getProjectFiles(project: Project): Observable<ProjectItemFile[]> {
    Assertion.assertValue(project, 'project');

    const path = `v1/project-management/projects/${project.uid}/files`;

    return this.core.http.get<ProjectItemFile[]>(path);
  }


  getProjectItemFiles(projectItem: ProjectItem): Observable<MediaFile[]> {
    Assertion.assertValue(projectItem, 'projectItem');

    const path = `v1/project-management/project-items/${projectItem.uid}/files`;

    return this.core.http.get<MediaFile[]>(path);
  }


  deleteProjectItemFile(projectItem: ProjectItem, mediaFile: MediaFile): Observable<void> {
    const path = `v1/project-management/project-items/${projectItem.uid}/files/${mediaFile.uid}`;

    return this.core.http.delete<void>(path);
  }


  uploadProjectItemFile(projectItem: ProjectItem,
                        fileToUpload: File, metadata: MediaMetadata): Observable<MediaFile> {
    Assertion.assertValue(projectItem, 'projectItem');
    Assertion.assertValue(fileToUpload, 'fileToUpload');
    Assertion.assertValue(metadata, 'metadata');

    const path = `v1/project-management/project-items/${projectItem.uid}/files`;

    const formData: FormData = new FormData();

    formData.append('media', fileToUpload, fileToUpload.name);

    formData.append('title', metadata.title);
    formData.append('type', metadata.type);
    formData.append('summary', metadata.summary);
    formData.append('authors', metadata.authors);
    formData.append('tags', metadata.tags);
    formData.append('topics', metadata.topics);

    return this.core.http.post<MediaFile>(path, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }


}
