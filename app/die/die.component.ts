import {Component, OnInit, Input} from '@angular/core';
import {RandomNumberService} from "../utils/random-number.service";

@Component({
  selector: 'my-die',
  providers: [RandomNumberService],
	template: `
	<div class="die visible-{{visible}}" [ngStyle]="{'background': backgroundColorOfDie,'color':colorOfDie}">
		{{value}}
	</div>`,
	styles: [`
	 .die {
	    display: inline-block;
	    width: 30px;
	    height: 30px;
	    text-align: center;
	    vertical-align: middle;
	    padding-top: 6px;
	    border-radius: 5px;
	 }
	 .die.visible-false {
	    visibility: hidden;
	 }
`]
})
export class DieComponent implements OnInit {
	@Input('backColOfDie') backgroundColorOfDie:string;
	@Input() colorOfDie:string;
	@Input() rollAgainNr:number;

	value: number = 0;
	visible: boolean = false;

	constructor(public randomNumberService: RandomNumberService) {}

	roll() {
		this.visible = false;
		this.value = this.randomNumberService.getNr(1, 6);
		setTimeout(() => {this.visible = true;}, 100);
	}

	ngOnInit() {
		// this.roll();
	}
}
/*
 templateUrl: './die.component.html',

 styleUrls: ['./die.component.css']
 */