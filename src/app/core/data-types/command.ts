/**
 * @license
 * Copyright (c) La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 */

import { Assertion } from '../general/assertion';


export interface Command {
  readonly type: string;
  readonly payload?: any;
}


export interface EventInfo {
  readonly type: string;
  readonly payload?: any;
}


export interface CommandResult extends Command {
  readonly result: any;
}


export function createCommand(type: string, payload?: any): Command {
  const command: Command = { type, payload };

  return command;
}


export abstract class CommandHandler {

  readonly commands: string[] = [];


  constructor(commands: any) {
    Assertion.assertValue(commands, 'commands');

    this.commands = Object.keys(commands).map(k => commands[k as string]);
  }

  abstract execute(command: Command): void;

  abstract execute<U>(command: Command): Promise<U>;

  protected unhandledCommand(command: Command): never {
    const msg = `${CommandHandler.name} is not able to handle command ${command.type}.`;

    throw Assertion.assertNoReachThisCode(msg);
  }

}
