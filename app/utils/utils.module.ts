import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {QwixxPointsPipe} from "./qwixxPoints.pipe";
import {ReversePipe} from "./reverse.pipe";
import {UppercaseTestPipe} from "./uppercaseTest.pipe";
import {MyBorder} from "./my-border.directive";
import {MyHighight} from "./my-highlight.directive";

@NgModule ({
    imports:[
        CommonModule
    ],
    declarations:[
        QwixxPointsPipe,
        ReversePipe,
        UppercaseTestPipe,
        MyHighight,
        MyBorder
    ],
    exports:[
        QwixxPointsPipe,
        ReversePipe,
        UppercaseTestPipe,
        MyHighight,
        MyBorder
    ]
})
export class UtilsModule {

}
