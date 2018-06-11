/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component } from '@angular/core';

@Component({
    selector:'subjects',
    templateUrl:'./subjects.component.html',
    styleUrls: ['./subjects.component.scss']
})

export class SubjectComponent {

    public subjects: string[] = [];
    public newSubjectText = "";

    public addSubject(): void {
        this.subjects.push(this.newSubjectText);
    }

}
