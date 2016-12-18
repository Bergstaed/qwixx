import {
    Component, OnInit, ChangeDetectorRef,
    AfterViewInit, ViewChild, ViewChildren,
    QueryList
} from "@angular/core";
import {SharedService} from "./shared.service";
import {PossibleClicks} from "./possibleClicks";
import {DieRowComponent} from "./dieRow/dieRow.component";
import {CheckboxmarkerRowComponent} from "./checkboxMarkerRow/checkboxMarkerRow.component";
import {FailCounterComponent} from "./failCounter/failCounter.component";


@Component({
    selector: 'app',
    template: `<div class="wrapper">
    <h1>{{title | upper}}</h1>
    <player [activePlayerNr]="activePlayerNr"
            [appPlayerNr]="appPlayerNr"></player>
    <!--<round [activeRoundNr]="activeRoundNr"></round>-->
    
    <checkboxMarkerRow *ngFor="let row of rowAr; let i = index"
    (tellSumOfMarker)="tellSumOfCheckboxes($event,i)"
    (tellIsLast)="tellIsLast($event)"
    [artOfGame]="gameTypes[gameTypeNr]"
    [allowedBoxesToClick]="allowedBx"
    [allowedBoxesToClickDummyChangeValue]="allowedBoxesToClickDummyChangeValue"
    [colorOfBoxes]="getColors(i)"
    [numbersOfBoxes]="getNumbers(i)"
    [round]="roundNr"
    [hasGameFinished]="hasGameFinished"
    [isActivePlayer]="isActivePlayer"></checkboxMarkerRow>

    <failCounter [isActivePlayer]="isActivePlayer"
    (failCounterPressed)="increaseFailCnt($event)"></failCounter>
    <span class="margLeft">Summe: {{points}}</span>
    <br><div *ngIf="hasGameFinished" class="endOfgame"> Ende des Spiels</div>
    <br>
    <dieRow (transfer)="transferPossibleDieValues($event)"></dieRow>
      <button class="margLeft button--big" [disabled]="isReadyButtonDisabled" (click)="nextPlayer()">Fertig</button>
      <br>
    <br>
    <button (click)="init(0)">Neues Spiel classic</button>
    <button (click)="init(1)">Neues Spiel mixCol</button>
    <button (click)="init(2)">Neues Spiel mixNum</button><br><br>
    <a href="http://www.brettspiele-magazin.de/qwixx-gemixxt/" target="_blank">Varianten Qwixx</a>
    <div>TODOs</div><ul>
    <li>Reset-Funktion in jede Komponente, die auch onInit und AfterInit aufruft</li>
    <li>Router für Spiel-Versionen</li>
    <li>Eingabe der Spielernamen (und Anzahl der Spieler)</li>
    <li>Utils Module erstellen</li>
    </ul>
    <input [(ngModel)]="title" type="text">
    </div>
`
})
export class AppComponent implements OnInit, AfterViewInit {
    allowedBx:PossibleClicks = {all:[], col0:[], col1:[], col2:[], col3:[]};
    allowedBoxesToClickDummyChangeValue:number = 0;
    rowAr: Array<any> = [0,1,2,3];
    // dieRow sendet erlaubte Felder über EventEmitter hier in die app.component
    // Diese Daten von hier an CheckboxmarkerRow an Input senden
    activePlayerNr:number = 0;
    appPlayerNr:number = 0;
    gameTypes:Array<string> = ["classic","colorchange","numberchange"];
    gameTypeNr:number = 0;
    isActivePlayer:boolean;
    isReadyButtonDisabled:boolean;
    hasGameFinished:boolean;
    title:string = 'qwixx';
    sumMarker:Array<number> = [0, 0, 0, 0];
    roundNr:number;
    points:number = 0;
    numberOfFailCounts:number = 0;
    possibleClickValue:number = 0;
    rowsCompleted:number = 0;
    rowColors;
    rowNumbers;

    @ViewChildren(CheckboxmarkerRowComponent) checkBoxMarkerRowCompList : QueryList<CheckboxmarkerRowComponent>;
    @ViewChild(DieRowComponent) dieRow : DieRowComponent;
    @ViewChild(FailCounterComponent) failCounter : FailCounterComponent;

    constructor(private sh:SharedService, private cdRef:ChangeDetectorRef){}

    ngOnInit(): void {
        this.init(this.gameTypeNr);
    }

    ngAfterViewInit(): void {
        // avoid: Expression has changed after it was checked
        this.cdRef.detectChanges();
    }

    init(gamenr:number=0){
        this.gameTypeNr = gamenr;
        this.hasGameFinished = false;
        this.rowsCompleted = 0;

        if (this.dieRow) {
            this.dieRow.rollAllDices();
        }

        this.failCounter.resetFailCounts();
        this.numberOfFailCounts = 0;

        this.rowColors = this.sh.rowColors[this.gameTypes[gamenr]];
        this.rowNumbers = this.sh.rowNumbers[this.gameTypes[gamenr]];
        this.roundNr = 0;

        this.isActivePlayer = (this.activePlayerNr == this.appPlayerNr);
        this.isReadyButtonDisabled = this.isActivePlayer;

        this.failCounter.ngOnInit();

        if (this.checkBoxMarkerRowCompList) {
            this.checkBoxMarkerRowCompList.forEach(component => {
                component.resetRow();
                component.sumOfMarker = 0;
            });
        }

        this.points = 0;

    }

    // called, when marking a checkboxMarker
    tellSumOfCheckboxes (sum:number, id:number):void {
        this.sumMarker[id]= sum;

        this.setPoints();

        this.roundNr++;
        // 1 : white; 2: color; 3: color and white;
        this.possibleClickValue = this.sh.possibleClickValue;

        if (!this.isActivePlayer || this.possibleClickValue == 2 || this.roundNr >= 2) {
            this.nextPlayer();

            return;
        }

        this.isReadyButtonDisabled = false;
        this.failCounter.isActive = false;
    }

    tellIsLast (isLast:boolean):void {
        if (isLast) {
            this.rowsCompleted++;
        }
        if (this.rowsCompleted >=2) {
            this.showEndOfGame();
        }
    }

    setPoints (): void {
        this.points = this.getSumofPoints() - this.numberOfFailCounts * 5;
    }

    increaseFailCnt(cnt:number):void {
        this.numberOfFailCounts = cnt;
        this.setPoints();

        if (cnt >= 4) {
            this.showEndOfGame();
            return;
        }
        this.nextPlayer();
    }

    showEndOfGame() {
        this.hasGameFinished = true;
        this.isReadyButtonDisabled = true;
    }

    getNumbers(rowNr:number):Array<number> {
        return this.rowNumbers[rowNr];
    }

    getSumofPoints(): number {
        let sum:number = 0;
        this.checkBoxMarkerRowCompList.forEach(component => {
            let markedBoxes = component.sumOfMarker;
            sum += this.getPoints(markedBoxes);
        });
        return sum;
    }

    getPoints(num:number): number {
        let res:number = 0;
        for (let i=1; i<=num; i++) {
            res += i;
        }
        return res;
    }

    getColors(rowNr:number):Array<number> {
        return this.rowColors[rowNr];
    }

    transferPossibleDieValues (ev):void {
        this.allowedBx = ev;
        this.allowedBoxesToClickDummyChangeValue++;
    }

    nextPlayer() {
        this.activePlayerNr = this.sh.nextActivePlayer();
        this.isActivePlayer = (this.activePlayerNr == this.appPlayerNr);
        this.isReadyButtonDisabled = this.isActivePlayer;
        this.roundNr = 0;
        this.dieRow.rollAllDices();
    }
}