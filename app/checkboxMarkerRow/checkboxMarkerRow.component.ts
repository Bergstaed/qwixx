import {
    Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter, ViewChildren,
    QueryList, AfterViewInit
} from "@angular/core";
import {SharedService} from "../shared.service";
import {COLORS_QWIXX} from "../mock-colors-qwixx";
import {CheckboxMarkerComponent} from "../checkboxMarker/checkboxMarker.component";
import {PossibleClicks} from "../possibleClicks";

@Component ({
    selector: 'checkboxMarkerRow',
    template: `
<div style="clear: both; display: table">
<checkbox-marker
    *ngFor="let box of rowNumbers; let i = index" 
    [colorOfBox]="getColor(colorOfBoxes[i])"
    [colorNrOfBox]="colorOfBoxes[i]"
    [indexOfBox]="i"
    [boxNr]="numbersOfBoxes[i]"
    [isLastInRow]="i==rowNumbers.length-1"
    (clickCheckMarker)="clickOnBox($event)" ></checkbox-marker>
    <span class="points">{{sumOfMarker | qwixxPoints}}</span>
    <span>{{sharedServiceTest}}</span>
</div>
`,
    styles:[`
.points {
    display: inline-block;
    padding: 6px 10px 0 5px;
}
`]
})
export class CheckboxmarkerRowComponent implements OnInit, AfterViewInit, OnChanges {

    @Input() colorOfBoxes:Array<number>;
    @Input() numbersOfBoxes:Array<number>;

    @Input() allowedBoxesToClick:PossibleClicks;
    @Input() round: number;

    @Output() tellSumOfMarker:EventEmitter<number> = new EventEmitter();

    @ViewChildren(CheckboxMarkerComponent) checkBoxMarkerCompList : QueryList<CheckboxMarkerComponent>;

    rowNumbers: Array<number> = [];
    sumOfMarker:number = 0;
    sharedServiceTest:string;

    constructor(private sh:SharedService) {
    }

    ngOnInit(): void {
        this.rowNumbers = this.sh.rowNumbers[0];
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.setAllowedNumbersToClick(this.allowedBoxesToClick);
    }

    ngAfterViewInit(): void {
        // das letzte Element ist disabled:
        this.checkBoxMarkerCompList.last.isDisabled = true;
    }

    clickOnBox(id:number): void {
        this.disableBoxesOnTheLeft(id);
        this.sumOfMarker++;
        this.tellSumOfMarker.emit(this.sumOfMarker);
        this.checkLastField();

        this.sharedServiceTest = this.sh.name;

        this.checkBoxMarkerCompList.forEach(component => {
            component.round = this.round;
        });
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

    getAValue(i): boolean{
        return false;
    }
}