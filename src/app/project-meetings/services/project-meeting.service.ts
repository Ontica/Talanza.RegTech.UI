/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CoreService } from '../../core/core.service';

import { Meeting } from '../data-types/meeting';

export enum MeetingServiceErr {
  GET_MEETING_OPENEND_ERR =
        '[GET_OPENEND_MEETING_ERR] No pude leer las meetings abiertas.', 
  POST_MEETING_ERR =
        '[POST_MEETING_ERR] Ocurrió un problema al guardar la meeting.',
  GET_MEETINGS_ERR =
        '[GET_MEETINGS_ERR] Ocurrió un problema al leer la lista de meetings.',      
  GET_MEETING_ERR =
        '[GET_MEETING_ERR] Ocurrió un problema al leer la meeting.', 
  POST_CLOSE_MEETING_ERR =
        '[POST_CLOSE_MEETING_ERR] Ocurrió un problema al cerrar la meeting.',
  POST_OPEN_MEETING_ERR =
        '[POST_OPEN_MEETING_ERR] Ocurrió un problema al abrir la meeting.', 
  DELETE_MEETING_ERR =
        '[DELETE_MEETING_ERR] Ocurrió un problema al eliminar la meeting.',      
  
}

@Injectable()
export class ProjectMeetingService {
    constructor(private core:CoreService) {}
  
    public getOpenedMeetings(keywords?: string): Observable<Meeting[]> {     
           
      let path = `v1/project-management/meetings/opened/`;
      
      if (keywords) {
         path += `?keywords=${keywords}`;
      }  
          
      return this.core.http
                 .get<Meeting[]>(path)                  
                 .catch((e) => this.core.http.showAndReturn(e, MeetingServiceErr.GET_MEETING_OPENEND_ERR, null)) 
    
    }

    public getMeetings(keywords?: string): Observable<Meeting[]> {     
      
      let path = `v1/project-management/meetings/`;
      
      if (keywords) {
         path += `?keywords=${keywords}`;
      }  
          
      return this.core.http
                 .get<Meeting[]>(path)                  
                 .catch((e) => this.core.http.showAndReturn(e, MeetingServiceErr.GET_MEETINGS_ERR, null)) 
    
    }
    
    public getMeeting(meetingUID: string): Observable<Meeting> {
    
      let path = `v1/project-management/meetings/${meetingUID}`;    
          
      return this.core.http
                 .get<Meeting[]>(path)                  
                 .catch((e) => this.core.http.showAndReturn(e, MeetingServiceErr.GET_MEETING_ERR, null)) 
    }

    public addMeeting(meeting: Meeting) {
      let path = `v1/project-management/meetings`;  

      return this.core.http
                      .post<any>(path, meeting)
                      .catch((e) => 
                              this.core.http.showAndReturn(e,MeetingServiceErr.POST_MEETING_ERR, null));
    }

    public updateMeeting(meeting: Meeting) {
      
     let path = `v1/project-management/meetings/${meeting.uid}`;  

      return this.core.http
                      .put<any>(path, meeting)
                      .catch((e) => 
                              this.core.http.showAndReturn(e,MeetingServiceErr.POST_MEETING_ERR, null));
    }
  
    public closeMeeting(meetingUID: string) {
      let path = `v1/project-management/meetings/${meetingUID}/close`;

      return this.core.http
            .post<any>(path,'')
                      .catch((e) => 
                              this.core.http.showAndReturn(e,MeetingServiceErr.POST_CLOSE_MEETING_ERR, null));
    }

    public openMeeting(meetingUID: string) {
      let path = `v1/project-management/meetings/${meetingUID}/open`;

      return this.core.http
            .post<any>(path,'')
                      .catch((e) => 
                              this.core.http.showAndReturn(e,MeetingServiceErr.POST_OPEN_MEETING_ERR, null));
    }

    public deleteMeeting(meetingUID: string) {
      let path = `v1/project-management/meetings/${meetingUID}`;

      return this.core.http
            .delete<any>(path)
                      .catch((e) => 
                              this.core.http.showAndReturn(e,MeetingServiceErr.DELETE_MEETING_ERR, null));
    }


}
