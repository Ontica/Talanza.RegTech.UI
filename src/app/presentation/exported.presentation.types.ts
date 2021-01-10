/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */


import { MainLayoutActions, MainLayoutSelectors } from './main-layout/_main-layout.presentation.types';
export * from './main-layout/_main-layout.presentation.types';


import { StepsActions, StepsCommands, StepsEffects, StepsSelectors } from './steps/_steps.presentation.types';
export * from './steps/_steps.presentation.types';


/* Exportation types */

export type ActionType = MainLayoutActions | StepsActions;

export type CommandType = StepsCommands;

export type StateEffect = StepsEffects;

export type StateSelector = MainLayoutSelectors | StepsSelectors;
