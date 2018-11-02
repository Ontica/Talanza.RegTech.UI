/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */


export interface Ticket {
  uid: string,
  type: string,
  typeName: string,
  controlNo: string,
  title: string,
  description: string,
  requestedTime: Date,
  assignedTo: string,
  resolutionTime: Date,
  customerName: string,
  status: string,
  date: Date,
  endTime: string
  location: string
  startTime: string
}


export interface Participants {
  uid: string,
  shortName: string
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


export interface MeetingReport extends Ticket {
  participants: Participants,
  Topic: Topic
  Recomendation: Recommendation
}


export function EmptyTicket() {
  const empty: Ticket = {
    uid: '',
    type: '',
    typeName: '',
    controlNo: '',
    title: '',
    description: '',
    requestedTime: new Date,
    assignedTo: '',
    resolutionTime: new Date,
    customerName: '',
    status: '',
    date: new Date,
    endTime: '',
    location: '',
    startTime: ''
  }

  return empty;
}
