
import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import { AppComponent } from './app.component';
import { FormsModule }   from '@angular/forms';

import {CheckboxMarkerComponent} from "./checkboxMarker.component";
import {CheckboxmarkerRowComponent} from "./checkboxMarkerRow.component";
import {DieComponent} from "./die/die.component";
import {DieRowComponent} from "./dieRow.component";
import {SharedService} from "./shared.service";
import {FailCounterComponent} from "./failCounter.component";
import {PlayerComponent} from "./player.component";
import {RoundComponent} from "./round.component";
import {UtilsModule} from "./utils/utils.module";


@NgModule ( {
    imports: [
        BrowserModule,
        FormsModule,
        UtilsModule
    ],
    declarations: [
        AppComponent,
        CheckboxmarkerRowComponent,
        CheckboxMarkerComponent,
        DieComponent, DieRowComponent,
        PlayerComponent,
        RoundComponent,
        FailCounterComponent],
    providers: [SharedService],
    bootstrap: [AppComponent]
})
export class AppModule {}