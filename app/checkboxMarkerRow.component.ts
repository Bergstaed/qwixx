import {
    Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter, ViewChildren,
    QueryList, AfterViewInit
} from "@angular/core";
import {SharedService} from "./shared.service";
import {COLORS_QWIXX} from "./mock-colors-qwixx";
import {CheckboxMarkerComponent} from "./checkboxMarker.component";
import {PossibleClicks} from "./possibleClicks";

@Component ({
    selector: 'checkboxMarkerRow',
    template: `
<div style="clear: both; display: table">
<div style="float: left;padding-top: 6px" [ngStyle]="{'color': getColor(colorOfBoxes[0])}">&#9654;</div>
<checkbox-marker
    *ngFor="let box of rowNumbers; let i = index" 
    [colorOfBox]="getColor(colorOfBoxes[i])"
    [colorNrOfBox]="colorOfBoxes[i]"
    [borderColorOfBox]="getBorderColor(colorOfBoxes[i])"
    [indexOfBox]="i"
    [isActivePlayer]="isActivePlayer"
    [boxNr]="numbersOfBoxes[i]"
    [round]="round"
    [hasGameFinished]="hasGameFinished"
    [hasRoundedCorner]="true"
    [isLastInRow]="i==rowNumbers.length-1"
    (clickCheckMarker)="clickOnBox($event)" ></checkbox-marker>
    <span class="points noselect">{{sumOfMarker | qwixxPoints}} <span class="light">({{sumOfMarker}})</span></span>
</div>
`,
    styles:[`
.points {
    display: inline-block;
    padding: 6px 10px 0 5px;
}
.light {
 color: gainsboro;
}
`]
})
export class CheckboxmarkerRowComponent implements OnInit, AfterViewInit, OnChanges {

    @Input() artOfGame:string;
    @Input() colorOfBoxes:Array<number>;
    @Input() numbersOfBoxes:Array<number>;
    @Input() hasGameFinished:boolean;

    // TODO: check, if this setter is a solution to eliminate allowedBoxesToClickDummyChangeValue
    private _allowedBoxesToClick;
    @Input()
    set allowedBoxesToClick(allowedBoxesToClick: PossibleClicks) {
        this._allowedBoxesToClick = allowedBoxesToClick;
       // this.setAllowedNumbersToClick(this.allowedBoxesToClick);
    }
    get allowedBoxesToClick(): PossibleClicks { return this._allowedBoxesToClick; }

    @Input() allowedBoxesToClickDummyChangeValue:number;
    @Input() isActivePlayer:boolean;
    @Input() round: number;

    @Output() tellSumOfMarker:EventEmitter<number> = new EventEmitter();
    @Output() tellIsLast:EventEmitter<boolean> = new EventEmitter();

    @ViewChildren(CheckboxMarkerComponent) checkBoxMarkerCompList : QueryList<CheckboxMarkerComponent>;

    rowNumbers: Array<number> = [];
    sumOfMarker:number = 0;
    //dummyChange:number = 0;

    constructor(private sh:SharedService) {
    }

    ngOnInit(): void {
        this.rowNumbers = this.sh.rowNumbers[this.artOfGame][0];
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.setAllowedNumbersToClick(this.allowedBoxesToClick);
        //this.dummyChange++; // [dummyChange]="dummyChange"
    }

    resetRow() {
        this.sumOfMarker = 0;
        this.checkBoxMarkerCompList.forEach(component => {
            component.isDisabled = false;
            component.isMarked = false;
        });

        this.ngAfterViewInit();
    }

    ngAfterViewInit(): void {
        // das letzte Element ist disabled:
        this.checkBoxMarkerCompList.last.isDisabled = true;
    }

    clickOnBox(id:number): void {
        let isLast:boolean = false;

        this.disableBoxesOnTheLeft(id);
        this.sumOfMarker++;
        if (id == this.rowNumbers.length - 1) {
            isLast = true;
            this.sumOfMarker++;
        }
        this.tellSumOfMarker.emit(this.sumOfMarker);
        this.tellIsLast.emit(isLast);
        this.checkLastField();
    }

    checkLastField() : void {
        if (this.sumOfMarker >= 5 && !this.checkBoxMarkerCompList.last.isMarked) {
            this.checkBoxMarkerCompList.last.isDisabled = false;
        }
    }

    disableBoxesOnTheLeft(id:number) {
        this.checkBoxMarkerCompList.filter( (item, index: number, array) => index <= id)
            .forEach(component => {
            component.isDisabled = true;
        });

        // https://angular.io/docs/js/latest/api/core/index/QueryList-class.html zeigt Interface von QueryList

        // let i:number = 0;
        // this.checkBoxMarkerCompList.forEach(component => {
        //     if (i++ <= id) {
        //         component.isDisabled = true;
        //     }
        // });
    }

    getColor(colorNr:number) : string {
        return COLORS_QWIXX.diceFieldColor[colorNr];
    }

    getBorderColor(colorNr:number) : string {
        return COLORS_QWIXX.diceBackground[colorNr];
    }

    setAllowedNumbersToClick(possValues) : void {
        if (!this.checkBoxMarkerCompList) return;

        this.checkBoxMarkerCompList.forEach(component => {
            component.isClickPossibleRound1 = possValues.all.indexOf(component.boxNr) >= 0;

            switch (component.colorNrOfBox) {
                case 0:
                    component.isClickPossible = possValues.col0.indexOf(component.boxNr) >= 0;
                    break;
                case 1:
                    component.isClickPossible = possValues.col1.indexOf(component.boxNr) >= 0;
                    break;
                case 2:
                    component.isClickPossible = possValues.col2.indexOf(component.boxNr) >= 0;
                    break;
                case 3:
                    component.isClickPossible = possValues.col3.indexOf(component.boxNr) >= 0;
                    break;

            }
        });
    }

}