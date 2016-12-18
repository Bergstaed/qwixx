import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";

import {QwixxPointsPipe} from "./qwixxPoints.pipe";
import {ReversePipe} from "./reverse.pipe";
import {UppercaseTestPipe} from "./uppercaseTest.pipe";

@NgModule ({
    imports:[
        CommonModule
    ],
    declarations:[
        QwixxPointsPipe,
        ReversePipe,
        UppercaseTestPipe
    ],
    exports:[
        QwixxPointsPipe,
        ReversePipe,
        UppercaseTestPipe
    ]
})
export class UtilsModule {

}
