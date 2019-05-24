/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component, EventEmitter, Input, Output,
         OnInit, ViewChild, ElementRef, OnDestroy,
         OnChanges, SimpleChanges } from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { ProjectItemFile } from '@app/models/project-management';


@Component({
  selector: 'emp-steps-files-grid',
  templateUrl: './files-grid.component.html',
  styleUrls: ['./files-grid.component.scss']
})
export class FilesGridComponent implements OnInit, OnChanges, OnDestroy {

  @Input() files: ProjectItemFile[] = [];

  @Output() fileSelect = new EventEmitter<ProjectItemFile>();

  @ViewChild('gridContainer') container: ElementRef;


  gridColumns = 6;
  tileWidth = 270;

  selectedFile: ProjectItemFile;

  filteredFiles: ProjectItemFile[] = [];

  filter = '';

  private containerWidth = 0;

  private subs: Subscription;


  ngOnInit() {
    this.subs = interval(1000).subscribe(
      (() => this.setGridColumns())
    );
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['files']) {
      this.applyFilters();
    }
  }


  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }


  isSelected(file: ProjectItemFile) {
    return (this.selectedFile && file.uid === this.selectedFile.uid);
  }


  onSearch() {
    this.applyFilters();
  }


  onSelect(file: ProjectItemFile) {
    this.selectedFile = file;
    this.fileSelect.emit(file);
  }


  // private methods


  private applyFilters() {
    if (this.filter === '') {
      this.filteredFiles = this.files;
      return;
    }

    this.filteredFiles = this.files.filter(x => x.projectItem.name.includes(this.filter) ||
                                                x.mediaFile.name.includes(this.filter));

  }


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
