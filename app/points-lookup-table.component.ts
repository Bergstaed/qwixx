
import {Component} from "@angular/core";

@Component ({
    selector:'pointsLookupTable',
    template: `
<div class="points">
    <dl *ngFor="let item of list">
      <dt>{{item}}<span>x</span></dt>
      <dd>{{item | qwixxPoints}}</dd>
    </dl>
</div>
`,
    styles: [`
.points dl {
    display: inline-block;
    border: 1px solid grey;
    border-radius: 6px;
    margin-right: 3px;
    padding-left: 3px;
    padding-right: 3px;
}
.points dt {
    border-bottom: 1px solid lightgray;
}
.points dt span {
    padding-left: 0px;
}
.points dt, .points dd {
    text-align: center;
    width: 24px;
}
.points dd {
    margin-left: 0;
    font-weight: bold;
}
`]
})
export class PointsTableComponent {
    list: number[] = [1,2,3,4,5,6,7,8,9,10,11,12]
}