import { TestBed, inject, async } from '@angular/core/testing';
import { HttpModule, Http } from '@angular/http';

import { DirectoryService } from './directory.service';
import { Service, HttpMethod } from './common-types';

describe('DirectoryService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [DirectoryService]
    });
  });

  it(`should return undefined when it's called using a full url`, async(
    inject([DirectoryService], (directory: DirectoryService) => {
      directory.getService('https://no-domain.io/tests/collection')
               .subscribe((value) => {
                  expect(value).toBeUndefined();
               });
    })));

  it(`should return a GET service using the service's UID`, async(
    inject([DirectoryService], (directory: DirectoryService) => {
      directory.getService('System.GetLicense')
               .subscribe((value) => {
                  expect(value).toBeDefined();
                  expect(value.path).toBe('v1/system/license');
               });

    })));

  it(`should return a POST service using the service's UID`, async(
    inject([DirectoryService], (directory: DirectoryService) => {
      directory.getService('Security.Login')
               .subscribe((value) => {
                  expect(value).toBeDefined();
                  expect(value.path).toBe('v1/security/login');
                  expect(value.method).toBe('POST');
               });
    })));

  it(`should return a GET service using the service's path`, async(
    inject([DirectoryService], (directory: DirectoryService) => {
      directory.getService('v1/system/license')
               .subscribe((value) => {
                  expect(value).toBeDefined();
                  expect(value.path).toBe('v1/system/license');
                  expect(value.uid).toBe('System.GetLicense');
               });
    })));

  it(`should return a POST service using the service's path`, async(
    inject([DirectoryService], (directory: DirectoryService) => {
      directory.getService('v1/security/login')
               .subscribe((value) => {
                  expect(value).toBeDefined();
                  expect(value.path).toBe('v1/security/login');
                  expect(value.uid).toBe('Security.Login');
                  expect(value.method).toBe('POST');
               });

    })));

  it(`should return an ambiguous GET service using the service's path and HttpMethod`, async(
    inject([DirectoryService], (directory: DirectoryService) => {
      directory.getService('v1/tests/collection', HttpMethod.GET)
               .subscribe((value) => {
                  expect(value).toBeDefined();
                  expect(value.path).toBe('v1/tests/collection');
                  expect(value.uid).toBe('Tests.GetCollection');
                  expect(value.method).toBe('GET');
               });

    })));

  it(`should return an ambiguous POST service using the service's path and HttpMethod`, async(
    inject([DirectoryService], (directory: DirectoryService) => {
      directory.getService('v1/tests/collection', HttpMethod.POST)
               .subscribe((value) => {
                  expect(value).toBeDefined();
                  expect(value.path).toBe('v1/tests/collection');
                  expect(value.uid).toBe('Tests.PostCollection');
                  expect(value.method).toBe('POST');
               });

    })));

  it(`should return a GET service with parameters using the service's uid`, async(
    inject([DirectoryService], (directory: DirectoryService) => {
      directory.getService('Tests.GetCollectionItem')
               .subscribe((value) => {
                  expect(value).toBeDefined();
                  expect(value.path).toBe('v1/tests/collection/{0}');
                  expect(value.uid).toBe('Tests.GetCollectionItem');
                  // Parse parameter 'apple' then
                  //     expect(value.mergedPath).toBe('v1/tests/collection/apple');
                  expect(value.method).toBe('GET');
               });

    })));

});
