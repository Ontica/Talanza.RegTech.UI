/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */


export interface Faq {
  uid: string,
  question: string,
  answer: string,
  answeredBy: string,
  comments: string,
  accessMode: string,
  date: Date,
  status: string
}


export function EmptyFaq() {

  const empty: Faq = {
    uid: '',
    question: '',
    answer: '',
    answeredBy: '',
    comments: '',
    accessMode: '',
    date: new Date,
    status: ''
  }

  return empty;
}
