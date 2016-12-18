import {Component, AfterViewInit, Input} from "@angular/core";
import {Player} from "./player";
import {SharedService} from "./shared.service";

@Component({
    selector: 'player',
    template: `
    <ul *ngIf="playerAr" class="player-list">
    <li *ngFor="let pl of playerAr; let i = index"
        [ngClass]="{'active': activePlayerNr == i, 
        'playerOfApp': appPlayerNr == i }">{{pl.name}}</li>
</ul>
`
})
export class PlayerComponent implements AfterViewInit {
    playerAr: Array<Player>;
    @Input() activePlayerNr:number;
    @Input() appPlayerNr:number;

    constructor(private sh:SharedService) {}

    ngAfterViewInit(): void {
        this.playerAr = this.sh.playerThisRound;
    }
}