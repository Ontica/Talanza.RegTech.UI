/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Identifiable, DateString, Empty } from '../core';


export interface FileToUpload {
  file: File;
  metadata?: MediaMetadata;
}


export interface MediaMetadata {
  type?: string;
  title?: string;
  summary?: string;
  authors?: string;
  tags?: string;
  topics?: string;
}

export const EmptyMediaMetadata: MediaMetadata = {
  type: '',
  title: '',
  summary: '',
  authors: '',
  tags: '',
  topics: '',
};

export interface MediaFile extends Identifiable {
  mediaType: string;
  length: number;
  originalFileName: string;
  url: string;
  postingTime: DateString;
  postedBy: Identifiable;
  status: string;

  metadata: MediaMetadata;
}

export const EmptyMediaFile: MediaFile = {
  uid: '',
  name: '',
  mediaType: '',
  length: 0,
  originalFileName: '',
  url: '',
  postingTime: '',
  postedBy: Empty,
  status: '',

  metadata: EmptyMediaMetadata
};
