/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component } from '@angular/core';


@Component({
  selector: 'emp-kb-recomendations',
  templateUrl: './recomendations.component.html',
  styleUrls: ['./recomendations.component.scss']
})
export class RecomendationsComponent {

  recomendations: string[] = [];
  newRecomendation = '';

  addRecomendation(): void {
    this.recomendations.push(this.newRecomendation);
  }

}
