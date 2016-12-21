
import {Component, OnInit, Output, EventEmitter} from "@angular/core";
import {SharedService} from "./shared.service";

@Component({
    selector: 'gameVariation',
    template: `
<form *ngIf="gameVariationNames.length > 0" name="gameVariationForm" class="gameVariationForm fixed fixed--topright">
    <label *ngFor="let gameName of gameVariationNames; let i=index" >
        <input type="radio" name="gameVariation" value="{{gameName}}"
        (click)="selectGame(i)" [checked]="i==0">{{gameName}}
    </label>
</form>
`
})
export class GameVariationComponent implements OnInit {
    gameVariationNames:string[]; // = ["classic","colorchange","numberchange"];

    @Output() choose_new_game:EventEmitter<any> = new EventEmitter();

    constructor(private sh:SharedService) {}

    ngOnInit(): void {
        let gameVariationNames:string[] = [];
        let tempObj:any = this.sh.rowColors;
        for (let prop in tempObj) {
            gameVariationNames.push(prop);
        }

        this.gameVariationNames = gameVariationNames;
    }

    selectGame(gameNr:number) {
        this.sh.gameTypeNr = gameNr;
        this.choose_new_game.emit();
    }
}