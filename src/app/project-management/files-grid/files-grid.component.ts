/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, ElementRef, EventEmitter, Input, Output,
         OnInit, OnDestroy, ViewChild } from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { ProjectItemFile } from '@app/models/project-management';


@Component({
  selector: 'emp-steps-files-grid',
  templateUrl: './files-grid.component.html',
  styleUrls: ['./files-grid.component.scss']
})
export class FilesGridComponent implements OnInit, OnDestroy {

  @Input() files: ProjectItemFile[] = [];

  @Output() fileSelect = new EventEmitter<ProjectItemFile>();
  @Output() projectItemSelect = new EventEmitter<ProjectItemFile>();

  @Output() fileFilterChange = new EventEmitter<string>();


  @ViewChild('gridContainer', { static: true }) container: ElementRef;


  gridColumns = 6;
  tileWidth = 270;

  selectedFile: ProjectItemFile;

  filter = '';

  private containerWidth = 0;

  private subs: Subscription;


  ngOnInit() {
    this.subs = interval(1000).subscribe(
      (() => this.setGridColumns())
    );
  }


  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }


  isSelected(file: ProjectItemFile) {
    return (this.selectedFile && file.uid === this.selectedFile.uid);
  }


  onFilterChange() {
    this.fileFilterChange.emit(this.filter);
  }


  onSelect(file: ProjectItemFile) {
    this.selectedFile = file;
    this.fileSelect.emit(file);
  }


  onSelectProjectItem(file: ProjectItemFile) {
    this.selectedFile = file;
    this.projectItemSelect.emit(file);
  }


  fileIcon(file: ProjectItemFile) {
    switch(file.mediaFile.mediaType) {
      case 'application/pdf':
        return 'fa fa-file-pdf-o tile-icon';
      case 'application/vnd.ms-excel':
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return 'fa fa-file-excel-o tile-icon';
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return 'fa fa-file-word-o tile-icon';
      case 'application/x-zip-compressed':
        return 'fa fa-file-archive-o tile-icon';
      default:
        return 'fa fa-file-o tile-icon';
    }
  }


  // private methods


  private setGridColumns() {
    const maxGridColumns = 6;

    if (this.containerWidth === this.container.nativeElement.offsetWidth) {
      return;
    }

    this.containerWidth = this.container.nativeElement.offsetWidth;

    let cols = this.containerWidth / this.tileWidth;

    cols = Math.round(cols);

    if (cols > maxGridColumns) {
      this.gridColumns = maxGridColumns;
    } else if (cols >= 1) {
      this.gridColumns = cols;
    } else {
      this.gridColumns = 1;
    }
  }

}
