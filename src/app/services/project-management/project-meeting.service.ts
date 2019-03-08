/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */


import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CoreService } from '@app/core/core.service';

import { Meeting, Participant } from '@app/models/project-management';

export enum MeetingServiceErr {
  GET_OPENED_MEETINGS_ERR =
  '[GET_OPENEND_MEETING_ERR] No pude leer las reuniones de trabajo abiertas.',
  UPDATE_MEETING_ERR =
  '[UPDATE_MEETING_ERR] Ocurrió un problema al guardar la reunión de trabajo.',
  GET_MEETINGS_ERR =
  '[GET_MEETINGS_ERR] Ocurrió un problema al leer la lista de reuniones trabajo.',
  GET_MEETING_ERR =
  '[GET_MEETING_ERR] Ocurrió un problema al leer la reunión de trabajo.',
  AVAILABLE_PARTICIPANTS =
  '[AVAILABLE_PARTICIPANTS] Ocurrió un problema al leer la lista de participantes ' +
  'disponibles del meeting.',
  CLOSE_MEETING_ERR =
  '[CLOSE_MEETING_ERR] Ocurrió un problema al cerrar la reunión de trabajo.',
  OPEN_MEETING_ERR =
  '[OPEN_MEETING_ERR] Ocurrió un problema al abrir la reunión de trabajo.',
  ADD_PARTICIPANT_MEETING_ERR =
  '[ADD_PARTICIPANT_MEETING_ERR] Ocurrió un problema al agregar el ' +
  'participante en la reunión de trabajo.',
  DELETE_MEETING_ERR =
  '[DELETE_MEETING_ERR] Ocurrió un problema al eliminar la reunión de trabajo.',

}

@Injectable()
export class ProjectMeetingService {

  constructor(private core: CoreService) { }


  getOpenedMeetings(keywords?: string): Observable<Meeting[]> {
    let path = `v1/project-management/meetings/opened/`;

    if (keywords) {
      path += `?keywords=${keywords}`;
    }

    return this.core.http.get<Meeting[]>(path)
      .pipe(
        catchError(e => this.core.http.showAndReturn(e, MeetingServiceErr.GET_OPENED_MEETINGS_ERR, null))
      );
  }


  getMeetings(keywords?: string): Observable<Meeting[]> {
    let path = `v1/project-management/meetings/`;

    if (keywords) {
      path += `?keywords=${keywords}`;
    }

    return this.core.http.get<Meeting[]>(path)
      .pipe(
        catchError(e => this.core.http.showAndReturn(e, MeetingServiceErr.GET_MEETINGS_ERR, null))
      );

  }


  getMeeting(meetingUID: string): Observable<Meeting> {
    const path = `v1/project-management/meetings/${meetingUID}`;

    return this.core.http.get<Meeting[]>(path)
      .pipe(
        catchError(e => this.core.http.showAndReturn(e, MeetingServiceErr.GET_MEETING_ERR, null))
      );
  }


  addMeeting(meeting: Meeting) {
    const path = `v1/project-management/meetings`;

    return this.core.http.post<any>(path, meeting)
      .pipe(
        catchError(e => this.core.http.showAndReturn(e, MeetingServiceErr.UPDATE_MEETING_ERR, null))
      );
  }


  updateMeeting(meeting: Meeting) {
    const path = `v1/project-management/meetings/${meeting.uid}`;

    return this.core.http.put<any>(path, meeting)
      .pipe(
        catchError(e => this.core.http.showAndReturn(e, MeetingServiceErr.UPDATE_MEETING_ERR, null))
      );
  }


  closeMeeting(meetingUID: string) {
    const path = `v1/project-management/meetings/${meetingUID}/close`;

    return this.core.http.post<any>(path)
      .pipe(
        catchError(e => this.core.http.showAndReturn(e, MeetingServiceErr.CLOSE_MEETING_ERR, null))
      );
  }


  openMeeting(meetingUID: string) {
    const path = `v1/project-management/meetings/${meetingUID}/open`;

    return this.core.http.post<any>(path)
      .pipe(
        catchError(e => this.core.http.showAndReturn(e, MeetingServiceErr.OPEN_MEETING_ERR, null))
      );
  }


  deleteMeeting(meetingUID: string) {
    const path = `v1/project-management/meetings/${meetingUID}`;

    return this.core.http.delete<any>(path)
      .pipe(
        catchError(e => this.core.http.showAndReturn(e, MeetingServiceErr.DELETE_MEETING_ERR, null))
      );
  }


  getParticipantAvailable(meetingUID: string): Observable<Participant[]> {
    const path = `v1/project-management/meetings/${meetingUID}/participants/available`;

    return this.core.http.get<Participant[]>(path)
      .pipe(
        catchError(e => this.core.http.showAndReturn(e, MeetingServiceErr.AVAILABLE_PARTICIPANTS, null))
      );
  }


  addParticipantToMeeting(meetingUID: string, participantUID: string) {
    const path = `v1/project-management/meetings/${meetingUID}/participants`;

    const body = {
      participantUID: participantUID
    };

    return this.core.http.post<any>(path, body)
      .pipe(
        catchError(e => this.core.http.showAndReturn(e, MeetingServiceErr.ADD_PARTICIPANT_MEETING_ERR, null))
      );
  }


  deleteParticipantFromMeeting(meetingUID: string, participantUID) {
    const path = `v1/project-management/meetings/${meetingUID}/participants/${participantUID}`;

    return this.core.http.delete<any>(path)
      .pipe(
        catchError(e => this.core.http.showAndReturn(e, MeetingServiceErr.AVAILABLE_PARTICIPANTS, null))
      );
  }

}
