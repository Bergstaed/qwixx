import {
    Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild, ViewChildren, QueryList,
    OnChanges, SimpleChanges
} from "@angular/core";
import {SharedService} from "./shared.service";
import {PossibleClicks} from "./possibleClicks";
import {DieRowComponent} from "./dieRow/dieRow.component";
import {CheckboxmarkerRowComponent} from "./checkboxMarkerRow/checkboxMarkerRow.component";


@Component({
    selector: 'app',
    template: `<div class="wrapper">
    <h1>{{title | upper}}</h1>
    <player [activePlayerNr]="activePlayerNr"
            [appPlayerNr]="appPlayerNr"></player>
    <round [activeRoundNr]="activeRoundNr"></round>
    <checkboxMarkerRow (tellSumOfMarker)="checkSum($event,0)" [allowedBoxesToClick]="allowedBx" [colorOfBoxes]="getColors(0)" [numbersOfBoxes]="getNumbers(0)" [round]="roundNr" [isActivePlayer]="isActivePlayer"></checkboxMarkerRow>
    <checkboxMarkerRow (tellSumOfMarker)="checkSum($event,1)" [allowedBoxesToClick]="allowedBx" [colorOfBoxes]="getColors(1)" [numbersOfBoxes]="getNumbers(1)" [round]="roundNr" [isActivePlayer]="isActivePlayer"></checkboxMarkerRow>
    <checkboxMarkerRow (tellSumOfMarker)="checkSum($event,2)" [allowedBoxesToClick]="allowedBx" [colorOfBoxes]="getColors(2)" [numbersOfBoxes]="getNumbers(2)" [round]="roundNr" [isActivePlayer]="isActivePlayer"></checkboxMarkerRow>
    <checkboxMarkerRow (tellSumOfMarker)="checkSum($event,3)" [allowedBoxesToClick]="allowedBx" [colorOfBoxes]="getColors(3)" [numbersOfBoxes]="getNumbers(3)" [round]="roundNr" [isActivePlayer]="isActivePlayer"></checkboxMarkerRow>
    <failCounter [isActivePlayer]="isActivePlayer" (failCounterPressed)="increaseFailCnt($event)"></failCounter>
    <br><br>
    <dieRow (transfer)="transferPossibleDieValues($event)"></dieRow>
    <br>Summe: {{points}}
      <button (click)="nextPlayer()">Fertig</button>
      <br>
    <button disabled>Neues Spiel</button><br><br>
    <a href="http://www.brettspiele-magazin.de/qwixx-gemixxt/" target="_blank">Varianten Qwixx</a>
    </div>
`
})
export class AppComponent implements OnInit, AfterViewInit {
    allowedBx:PossibleClicks = {all:[], col0:[], col1:[], col2:[], col3:[]};

    // dieRow sendet erlaubte Felder über EventEmitter hier in die app.component
    // Diese Daten von hier an CheckboxmarkerRow an Input senden
    activePlayerNr:number = 0;
    appPlayerNr:number = 0;
    activeRoundNr:number = 0;
    isActivePlayer:boolean;
    title:string = 'qwixx';
    sumMarker:Array<number> = [0, 0, 0, 0];
    roundNr:number = 0;
    shstst:string = "x";
    points:number = 0;
    numberOfFailCounts:number = 0;
    rowColors;
    rowNumbers;

    @ViewChildren(CheckboxmarkerRowComponent) checkBoxMarkerRowCompList : QueryList<CheckboxmarkerRowComponent>;
    @ViewChild(DieRowComponent) dieRow : DieRowComponent;


    constructor(private sh:SharedService, private cdRef:ChangeDetectorRef){}

    ngOnInit(): void {
        this.sh.name = "InitName";
        this.rowColors = this.sh.rowColors;
        this.rowNumbers = this.sh.rowNumbers;

        this.isActivePlayer = (this.activePlayerNr == this.appPlayerNr);
    }

    ngAfterViewInit(): void {
        // avoid: Expression has changed after it was checked
        this.cdRef.detectChanges();
    }

    checkSum (sum:number,id:number):void {
        this.sumMarker[id]= sum;

        this.setPoints();
        this.shstst = this.sh.name;
    }
    setPoints (): void {
        this.points = this.getSumofPoints() - this.numberOfFailCounts * 5;
    }

    increaseFailCnt(cnt:number):void {
        this.numberOfFailCounts = cnt;
        this.setPoints();
        this.nextPlayer();
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

    getColorSpec():Array<number> {
        return this.sh.rowcolor;
    }

    transferPossibleDieValues (ev):void {
        this.allowedBx = ev;
        this.roundNr++;
    }

    nextPlayer() {
        this.activePlayerNr = this.sh.nextActivePlayer();
        this.isActivePlayer = (this.activePlayerNr == this.appPlayerNr);
        this.dieRow.rollAllDices();
    }
}

