/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Component } from '@angular/core';


@Component({
  selector: 'recomendations',
  templateUrl: './recomendations.component.html',
  styleUrls: ['./recomendations.component.scss']
})
export class RecomendationsComponent {

  public recomendations: string[] = [];
  public newRecomendation = "";

  public addRecomendation(): void {
    this.recomendations.push(this.newRecomendation);
  }

}
