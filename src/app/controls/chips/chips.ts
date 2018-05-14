import { Component, Input } from '@angular/core';

@Component({
	selector: 'chips',
	templateUrl: './chips.html',
	styleUrls: ['./chips.scss']
})

export class Chips {

	@Input() items: any;

	public removeTag(tag: string): void {
		let index =  this.items.findIndex((x) => x.name === tag);

		this.items[index].selected = false;
	}

}
