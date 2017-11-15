import { Component, EventEmitter, Output, OnInit } from '@angular/core';

import { TaskRef, EmptyTask, Tag } from '../../data-types/task';
import { PersonRef } from '../../data-types/project';

import { ActivityService } from '../../services/activity.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.scss'],
  providers: [ActivityService, ProjectService]
})

export class AddActivityComponent {

  public selectedTask: TaskRef = EmptyTask();
  public responsiblesList: PersonRef[] = [];
  public tags: Tag[] = [];
  public selectedTags: Tag[] = [];

  @Output() public onCloseEvent = new EventEmitter();

  public constructor(private activityService: ActivityService,
    private projectService: ProjectService) { }

  ngOnInit() {
    this.loadTags();
    
  }

  public cancel(): void {
    this.onClose();
  }

  public onClose(): void {
    this.onCloseEvent.emit();
  }

  private loadResponsiblesList(): void {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de responsables.';

    this.projectService.getResponsiblesList('this.task.project.uid')
      .toPromise()
      .then((x) => this.responsiblesList = x)
      .catch((e) => this.exceptionHandler(e, errMsg));
  }

  private async loadTags() {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de etiquetas.';

   await this.activityService.getTags()
                        .toPromise()
                        .then((x) => {
                          this.tags = x;
                          this.tags.forEach((x) => {         
                               x.selected = false;                            
                           });
                        })
                        .catch((e) => this.exceptionHandler(e, errMsg));
  }
  
  private exceptionHandler(error: any, defaultMsg: string): void {
    let errMsg = 'Tengo un problema.\n\n';

    if (typeof (error) === typeof (Error)) {
      errMsg += defaultMsg + '\n\n' + (<Error>error).message;
    } else {
      errMsg += defaultMsg + '\n\n' + 'Error desconocido.';
    }
    alert(errMsg);
  }
}