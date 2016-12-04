
import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { AppComponent } from './app.component';
import {CheckboxMarkerComponent} from "./checkboxMarker/checkboxMarker.component";
import {CheckboxmarkerRowComponent} from "./checkboxMarkerRow/checkboxMarkerRow.component";
import {ReversePipe} from "./utils/reverse.pipe";
import {DieComponent} from "./die/die.component";
import {UppercaseTestPipe} from "./utils/uppercaseTest.pipe";
import {DieRowComponent} from "./dieRow/dieRow.component";
import {SharedService} from "./shared.service";
import {QwixxPointsPipe} from "./utils/qwixxPoints.pipe";
import {FailCounterComponent} from "./failCounter/failCounter.component";


@NgModule ( {
    imports: [BrowserModule],
    declarations: [AppComponent,
        CheckboxmarkerRowComponent, CheckboxMarkerComponent,
        DieComponent, DieRowComponent,
        FailCounterComponent,
        ReversePipe, UppercaseTestPipe, QwixxPointsPipe],
    providers: [SharedService],
    bootstrap: [AppComponent]
})
export class AppModule {}
// ParentComponent, ChildComponent, ChildSiblingComponent
//     providers: [SharedService],