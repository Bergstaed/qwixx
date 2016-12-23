import {
    Component, ViewChildren, QueryList, AfterViewInit, ChangeDetectorRef, Output,
    EventEmitter, Input
} from "@angular/core";
import {COLORS_QWIXX} from "./mock-colors-qwixx";
import {DieComponent} from "./die/die.component";
import {SharedService} from "./shared.service";
import {PossibleClicks} from "./possibleClicks";

@Component({
    selector:'dieRow',
    template: `
<div  myBorder [myHighlight]="'#ccc'" style="display: inline-block">
    <my-die [backColOfDie]="getBackCol(4)" [colorOfDie]="getColor(4)" ></my-die>
    <my-die [backColOfDie]="getBackCol(4)" [colorOfDie]="getColor(4)" ></my-die> <span class="dist"></span>
    <my-die [backColOfDie]="getBackCol(0)" [colorOfDie]="getColor(0)" ></my-die>
    <my-die [backColOfDie]="getBackCol(1)" [colorOfDie]="getColor(1)" ></my-die>
    <my-die [backColOfDie]="getBackCol(2)" [colorOfDie]="getColor(2)" ></my-die>
    <my-die [backColOfDie]="getBackCol(3)" [colorOfDie]="getColor(3)" ></my-die>
    <button *ngIf="anzahl>0" class="margLeft button--big" (click)="decreaseCounterAndRollDices()"
      [disabled]="anzahl<=0 || !isActivePlayer" >würfel({{anzahl}}x)</button>
</div>
`,
    styles: [`
.dist {padding: 0 3px}`]
})
export class DieRowComponent implements AfterViewInit {
    possibleValues_ArNum: PossibleClicks = {all:[], col0:[], col1:[], col2:[], col3:[]};
    startValueDieAgain:number = 5;
    anzahl:number = this.startValueDieAgain;

    @Input() isActivePlayer:boolean;
    @Output() transfer:EventEmitter<any> = new EventEmitter();

    constructor(private sh:SharedService, private cdRef:ChangeDetectorRef){}

    ngAfterViewInit(): void {
        this.rollAllDices();
        // avoid: Expression has changed after it was checked
        this.cdRef.detectChanges();
    }

    @ViewChildren(DieComponent) dieComponentList: QueryList<DieComponent>;

    reset() {
        this.anzahl = this.startValueDieAgain;
    }

    getBackCol(colorNr:number):string {
        return COLORS_QWIXX.diceBackground[colorNr];
    }

    getColor(colorNr:number):string {
        return COLORS_QWIXX.diceColor[colorNr];
    }

    decreaseCounterAndRollDices() {
        this.anzahl--;
        this.rollAllDices();
    }

    rollAllDices () {
        let dieVal:Array<number> = [];
        if (!this.dieComponentList) {
            return
        }

        this.dieComponentList.forEach(component => {
            component.roll();
            dieVal.push(component.value);
        });

        let ar:Array<number> = [
            (dieVal[0] + dieVal[1]),

            (dieVal[0] + dieVal[2]),
            (dieVal[0] + dieVal[3]),
            (dieVal[0] + dieVal[4]),
            (dieVal[0] + dieVal[5]),
            (dieVal[1] + dieVal[2]),
            (dieVal[1] + dieVal[3]),
            (dieVal[1] + dieVal[4]),
            (dieVal[1] + dieVal[5]) ];

        this.possibleValues_ArNum.all  = [ (dieVal[0] + dieVal[1]) ];

        this.possibleValues_ArNum.col0 = [ (dieVal[0] + dieVal[2]) ];
        this.possibleValues_ArNum.col0.push(dieVal[1] + dieVal[2]);

        this.possibleValues_ArNum.col1 = [ (dieVal[0] + dieVal[3]) ];
        this.possibleValues_ArNum.col1.push(dieVal[1] + dieVal[3]);

        this.possibleValues_ArNum.col2 = [ (dieVal[0] + dieVal[4]) ];
        this.possibleValues_ArNum.col2.push(dieVal[1] + dieVal[4]);

        this.possibleValues_ArNum.col3 = [ (dieVal[0] + dieVal[5]) ];
        this.possibleValues_ArNum.col3.push(dieVal[1] + dieVal[5]);

        this.transfer.emit(this.possibleValues_ArNum);

    }
}