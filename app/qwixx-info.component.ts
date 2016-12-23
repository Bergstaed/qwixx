import {Component,
    trigger, state, style, transition, animate
} from "@angular/core";

@Component({
    selector: 'qwixxInfo',
    template:`
<div>
    <button *ngIf="!showToDos" (click)="showTheToDos(true)" class="button--round">show TODOs</button>
    <button *ngIf="showToDos" (click)="showTheToDos(false)" class="button--round">hide TODOs</button>
</div>
    <div [@heroState]="aniState" >
        <a href="http://www.brettspiele-magazin.de/qwixx-gemixxt/" target="_blank">Qwixx-Blöcke</a>
        <a href="https://www.spiele-offensive.de/Varianten/Qwixx-1012463.html" target="_blank">Varianten Regeln</a>
        <h3>TODOs</h3>
        <ul>
            <li>Reset-Funktion in jede Komponente, die auch onInit und AfterInit aufruft</li>
            <li>Punkte-Reihe zum ein-ausblenden</li>
            <li>Router für Spiel-Versionen</li>
            <li>Eingabe der Spielernamen (und Anzahl der Spieler)</li>
            <li>Verzögerungen bei Services berücksichtigen</li>
            <li>Bug: nach Spiel-Change werden Würfel falsch abgebildet</li>
            <li>Ende des Spiels animieren und entfernen</li>
        </ul>
    </div>
`,
    animations: [
        trigger('heroState', [
            state('inactive', style({
                display: 'none',
                opacity: '0'
                // , height: '0'
            })),
            state('active',   style({
                display: 'block',
                opacity: '1'
                // , height: '*'
            })),
            transition('inactive => active', animate('500ms linear')),
            transition('active => inactive', animate('300ms'))
        ])
    ]
})
export class QwixxInfoComponent {
    showToDos: boolean = false;
    aniState:string = 'inactive';

    // *ngIf="showToDos"

    showTheToDos(b:boolean) {
        this.showToDos = b;
        this.aniState = !b? 'inactive':'active';
    }

}