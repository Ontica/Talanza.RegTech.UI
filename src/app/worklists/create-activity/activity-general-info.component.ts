import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Activity, ProjectRef, EmptyActivity, ResourceRef, PersonRef  } from '../data-types/project';

import { ActivityService } from '../services/activity.service';

declare var dhtmlXCalendarObject: any;

@Component({
  selector:'activity-general-info',
  template:` <table class="form">
             <tr>
                <td class="form-title form-title-text">1) Tipo de actividad</td>
              </tr>              
            </table>
            <table class="form">
              <tr>
              <td>Actividad:</td>
              <td>{{activity.name}}</td>
              <td class="text-align-right">Tipo:Bloque de actividades</td>        
              </tr>
              <tr>
              <td>Descripción:</td>
              <td colspan="2">{{activity.notes}}</td>
              </tr>
            </table>
            
            <table class="form">
             <tr>
                <td class="form-title form-title-text">2) Información de la actividad</td>
              </tr>
            </table>
            <!--<activity-info  [project]="project" [parentId]="parentId" [activityId]="activityId" (onCloseEvent)="onClose()"></activity-info>
                <activity-info [project]="project" [activityId]="activityId" [operation]="activityOperation"  (onCloseEvent)="onClose()"></activity-info>
            -->
            <div>
            <table class="form">
              <tr>
                <td>Nombre:</td>
                <td>
                  <input type="text" class="text-box" [(ngModel)]="activity.name">
                </td>
              </tr>
              <tr>
                <td>Observaciones:</td>
                <td><textarea class="text-area" rows="5" cols="25" [(ngModel)]="activity.notes"></textarea></td>
              </tr>
              <tr>
                <td>Asociar con:</td>
                <td><select class="select-box" [(ngModel)]="activity.resourceUID">
                    <option value="">( Seleccionar )</option>
                    <option *ngFor="let resource of resourceList" 
                            [value]="resource.uid">{{resource.name}}</option>         
                    </select>
                </td>
              </tr>
            </table>
          </div>
          <table class="form">
            <tr>
              <td class="text-align-left">Fecha de inicio planeada:</td>
              <td><input type="text" id="startDateCalendar" class="text-box" style="width:100px" [ngModel]="activity.estimatedStart | date:'dd-MM-yyyy'" (target)="activity.estimatedStart=$event"></td>
              <td><button id="startDateCalendarButton" class="btn ">..</button></td>
              <td>Fecha de terminación estimada:</td>
              <td><input id="endDateCalendar" type="text" class="text-box" style="width:100px" [ngModel]="activity.estimatedEnd | date:'dd-MM-yyyy'" (target)="activity.estimatedEnd=$event"></td>
              <td><button id="endDateCalendarButton" class="btn ">..</button></td>
              <td><a class="right-position">73 días</a></td>
              <!--
            <tr>
              <td class="text-align-left ">Fecha y hora del evento:</td>
              <td><input type="text " id="eventDateCalendar " class="text-box " style="width:100px "></td>
              <td><button class="btn " id="eventDateCalendarButton ">..</button></td>
          
            </tr>
            -->
          </table>
          <table class="form">
            <tr>
              <td>Solicitado por:</td>
              <td><select class="select-box" style="width:380px" [(ngModel)]="activity.requestedByUID">
                          <option value="">( Seleccionar )</option>
                           <option *ngFor="let requester of requestersList" [value]="requester.uid">{{requester.name}}</option>                  
                          </select>
          
              </td>
              <td>El día:</td>
              <td><input type="text" id="requestedDateCalendar" class="text-box" style="width:100px" [ngModel]="activity.requestedTime | date: 'dd-MM-yyyy'" (target)="activity.requestedTime=$value"></td>
              <td><button class="btn right-position" id="requestedDateButton">..</button></td>
            </tr>
            <tr>
              <td>Responsable:</td>
              <td><select class="select-box" style="width:380px" [(ngModel)]="activity.responsibleUID">
                          <option value=" ">( Seleccionar )</option>
                          <option *ngFor="let responsible of responsiblesList" 
                                  [value]="responsible.uid">{{responsible.name}}</option>            
                          </select>
              </td>
            </tr>
          </table>
          <table class="form">
            <tr>
              <td>¿Marcar esta actividad como un hito?</td>
              <td><select class="select-box" style="width:100px " [(ngModel)]="activity.isMilestone ">
                          <option value="">( Seleccionar )</option>
                          <option value="true">Si</option>            
                          <option value="false">No</option>                
                          </select>
              </td>
            </tr>
            <tr>
              <td>¿Administrar esta actidad como un <br> proyecto separado?</td>
              <td><select class="select-box " style="width:100px " [(ngModel)]="activity.createSubproject ">
                          <option value="">( Seleccionar )</option>
                          <option value="true">Si</option>            
                          <option value="false">No</option>                
                          </select></td>
            </tr>
          </table>

            <div class="form-footer border-top">
              <table class="form">
                <tr>
                  <td class="text-align-right ">
                    <button class="btn " (click)="onClickCancel()">Cancelar</button>
                  </td>
                  <td class="text-align-right ">
                    <button class="btn " (click)="onClickUpdateActivity()">Guardar los cambios</button>
                  </td>
                </tr>
              </table>
            </div>`,
  styleUrls:['./activity-form.scss'],
  providers:[ActivityService]

})
export class ActivityGeneralInfoComponent  implements OnInit {

  @Input() public activityId: number;  
  @Input() public project: ProjectRef;
  
  @Output() public onCloseEvent = new EventEmitter();

  public resourceList: ResourceRef[] = [];
  public requestersList: PersonRef[] = [];
  public responsiblesList: PersonRef[] = [];

  private requestedDateCalendar: any;
  private startDateCalendar: any;
  private endDateCalendar: any;
  private eventDateCalendar: any;
  
  public activity: Activity = EmptyActivity();

  async ngOnInit() {    
    this.loadCalendars();

    this.loadLists(); 

    await this.loadActivity(this.activityId);    
  }

  public constructor(private activityService: ActivityService) { }

  public async onClickUpdateActivity() {
    this.setDatePropertiesValueFromCalendars(); 

    if(!this.validate()) {
      return;
    }     

    await this.updateActivity();
    this.onCloseEvent.emit();
  }


  private loadCalendars(): void {
    this.createCalendars();
    
  }
  private loadLists(): void {
    this.loadResourcesList();
    this.loadRequestersList();
    this.loadResponsiblesList();
  }

  private createCalendars(): void {
    this.requestedDateCalendar = new dhtmlXCalendarObject({ input: "requestedDateCalendar", button: "requestedDateButton" });
    this.startDateCalendar = new dhtmlXCalendarObject({ input: "startDateCalendar", button: "startDateCalendarButton" });
    this.endDateCalendar = new dhtmlXCalendarObject({ input: "endDateCalendar", button: "endDateCalendarButton" });
    this.eventDateCalendar = new dhtmlXCalendarObject({ input: "eventDateCalendar", button: "eventDateCalendarButton" });
    
  }

  private validate(): boolean {
    if (this.activity.name === '') {
      alert("El nombre de la actividad o evento se encuentra en blanco.");
      return false;
    }
    if (this.activity.resourceUID === '') {
      alert("Seleccionar asociado a de la lista.");
      return false;
    }
    if (this.activity.requestedByUID === '') {
      alert("Seleccionar solicitado por de la lista.");
      return false;
    }    
    if (this.activity.responsibleUID === '') {
      alert("Seleccionar el responsable de la lista.");
      return false;
    }

    return true;
  }
  
  private setDatePropertiesValueFromCalendars(): void {
    this.activity.requestedTime = this.requestedDateCalendar.getDate(true);
    this.activity.estimatedStart = this.startDateCalendar.getDate(true);
    this.activity.estimatedEnd = this.endDateCalendar.getDate(true);
   
  }
  private loadResourcesList(): void {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de recursos.';

    this.activityService.getResourcesList().toPromise()
      .then((x) => this.resourceList = x)
      .catch((e) => this.exceptionHandler(e, errMsg));      
  }

  private loadRequestersList(): void {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de solicitantes.';

    this.activityService.getRequestersList(this.project.uid)
      .toPromise()
      .then((x) => this.requestersList = x)
      .catch((e) => this.exceptionHandler(e, errMsg));
  }

  private loadResponsiblesList(): void {
    const errMsg = 'Ocurrió un problema al intentar leer la lista de responsables.';

    this.activityService.getResponsiblesList(this.project.uid)
      .toPromise()
      .then((x) => this.responsiblesList = x)
      .catch((e) => this.exceptionHandler(e, errMsg));
  }
  
  private loadActivity(itemId: number): void {
    const errMsg = 'Ocurrió un problema al intentar leer la actividad.';

    this.activityService.getActivity(itemId)
                        .toPromise()
                        .then((x) => this.activity = x)
                        .catch((e) => this.exceptionHandler(e, errMsg));
  }
  
  private async updateActivity() {
    const errMsg = 'Ocurrió un problema al intentar actualizar la actividad.';

    await this.activityService.updateActivity(this.project.uid, this.activityId, this.activity)
                        .toPromise()
                        .then((x) => x )
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