/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Identifiable, Empty } from '@app/core/data-types';

import { Project } from './project';

export interface Meeting {
  uid: string,
  controlNo: string
  title: string,
  description: string,
  project: Project,
  date: Date,
  startTime: string,
  endTime: string,
  location: string,
  status: string,
  participants: Participant[],
  topics: Topic[],
  recommendations: Recommendation[],
  // "agreements": []
}

export interface Participant extends Identifiable {
  email: string
}

export interface Topic {
  uid: string,
  name: string
}

export interface Recommendation {
  uid: string,
  question: string,
  answer: string,
  answeredBy: string
  comments: string,
  date: Date,
  accessMode: string,
  status: string
}

export function EmptyMeeting() {
  const empty: Meeting = {
    uid: '',
    controlNo: '',
    title: '',
    description: '',
    project: Empty,
    date: new Date,
    startTime: '',
    endTime: '',
    location: '',
    status: '',
    participants: [],
    topics: [],
    recommendations: [],
    // "agreements": []
  }

  return empty;
}

export function EmptyParticipant() {
  const empty: Participant = {
    uid: '',
    name: '',
    email: ''
  }

  return empty;
}
