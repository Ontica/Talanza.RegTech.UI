/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */
import { Component } from '@angular/core';

@Component({
  selector:'task-references',
  template:`
        <table class="form">
          <tr>
            <td class="form-title form-title-text">Referencias útilies para hacer el trabajo</td>
          </tr>
          <tr>
            <td>
              <table class="grid">
                <thead>
                  <tr>           
                    <th style="width:70%">Descripcón</th>
                    <th style="width:30%">Fuente</th>                     
                  </tr>
                </thead>
                <tbody>        
                  <tr>
                    <td style="width:70%"><a>Ley de Ingresos</a></td>
                    <td style="width:30%">SHCP</td>           
                  </tr> 
                  <tr>
                    <td style="width:70%"><a>Ley de Egresos (pags 25 a 29)</a></td>
                    <td style="width:30%">SHCP</td>                        
                  </tr>
                  <tr>
                    <td style="width:70%">¿Qué es el derecho?</td>
                    <td style="width:30%">Wikipedia</td>                     
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </table>
       
        <table class="form">
        <tr>
          <td>Buscar otros doucumentos:</td>
          <td><input type="text" class="text-box" style="width:420px"></td>
          <td class="text-align-right"><button class="btn-warning">Buscar</button></td>
        </tr>    
        <tr>
          <td colspan="3">
            <table class="grid">
              <thead>
                <tr>           
                  <th style="width:70%">Resultados de la busqueda</th>
                  <th style="width:30%">Fuente</th>                     
                </tr>
              </thead>
              <tbody>        
                <tr>
                  <td style="width:70%"><a>Ley de Residuos Peligrosos</a></td>
                  <td style="width:30%">ASEA</td>           
                </tr> 
                <tr>
                  <td style="width:70%"><a>Ley de Seguridad Nacional (pags 11 a 29)</a></td>
                  <td style="width:30%">Sedena</td>                        
                </tr>
                <tr>
                  <td style="width:70%">¿Qué es un residuo peligroso?</td>
                  <td style="width:30%">Wikipedia</td>                     
                </tr>
              </tbody>
            </table>          
          </td>
        </tr>
      </table>     
            `,
  styleUrls:['./task-form.scss','./task-references.component.scss'],

})
export class TaskReferencesComponent {
  
}