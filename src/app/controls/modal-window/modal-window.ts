/**
 * @license
 * Copyright (c) 2017 La Vía Óntica SC, Ontica LLC and contributors. All rights reserved.
 *
 * See LICENSE.txt in the project root for complete license information.
 *
 */

import { Component, EventEmitter, HostBinding, Input, Output  } from '@angular/core';

@Component({
    selector: 'modal-window',
    templateUrl: './modal-window.html',
    styleUrls: ['./modal-window.scss']
})

export class ModalWindow {
    @HostBinding('style.display') public display = 'block';
    @HostBinding('style.position') public position = 'absolute';

    @Input() public title = '';

    @Output() public onClose= new EventEmitter();
    
    public close(): void {
        this.onClose.emit();
    }
}
