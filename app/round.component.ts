import {Component, Input} from "@angular/core";

@Component ({
    selector: 'round',
    template: `
<ul *ngIf="true" class="round-list">
    <li [ngClass]="{'active': activeRoundNr == 0}">Runde 1</li>
    <li [ngClass]="{'active': activeRoundNr == 1}">Runde 2</li>
</ul>
`
})
export class RoundComponent{
    @Input() activeRoundNr = 0;
}