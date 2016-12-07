import {Component, OnInit, ChangeDetectorRef, AfterViewInit, ViewChild} from "@angular/core";
import {SharedService} from "./shared.service";
import {PossibleClicks} from "./possibleClicks";
import {DieRowComponent} from "./dieRow/dieRow.component";


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
    <failCounter></failCounter>
    <br><br>
    <dieRow (transfer)="transferPossibleDieValues($event)"></dieRow>
    <br>
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
    rowColors;
    rowNumbers;

   // @ViewChildren(CheckboxMarkerComponent) checkBoxMarkerCompList : QueryList<CheckboxMarkerComponent>;
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

        this.shstst = this.sh.name;
    }

    getNumbers(rowNr:number):Array<number> {
        return this.rowNumbers[rowNr];
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

