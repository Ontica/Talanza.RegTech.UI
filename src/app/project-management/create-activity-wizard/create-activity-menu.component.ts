import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

import { Project } from '../data-types/project';
import { Activity_Empty } from '../data-types/activity';

@Component({
	selector: 'create-activity-menu',
	templateUrl: './create-activity-menu.component.html',
	styleUrls: ['./create-activity-menu.component.scss']
})

export class CreateActivityMenuComponent {
	@HostBinding('style.display') public display = 'block';
	@HostBinding('style.position') public position = 'absolute';

	@Output() public onCloseEvent = new EventEmitter();

	@Input() public project: Project;

	public selectedOperation = '';
	public task = Activity_Empty;

	public onClose(): void {
		this.onCloseEvent.emit();
	}

	public onClickCancel(): void {
		this.onClose();
	}

	public addManualTask(): void {
		this.task.project = this.project;
		this.selectedOperation = 'addManual';
	}

	public addEvent(): void {
		this.selectedOperation = 'addEvent';
	}

}
