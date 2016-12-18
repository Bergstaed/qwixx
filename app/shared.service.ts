import {Injectable} from '@angular/core';
import {Player} from "./player";

@Injectable()
export class SharedService {
    dataArray: string[] = [];
    _name:string;
    gameTypeNr:number = 0;
    // 0: rot
    // 1: gelb
    // 2: grün
    // 3: blau
    rowColors = {
        classic: [
            [0,0,0,0,0,0,0,0,0,0,0],
            [1,1,1,1,1,1,1,1,1,1,1],
            [2,2,2,2,2,2,2,2,2,2,2],
            [3,3,3,3,3,3,3,3,3,3,3]
        ],
        colorchange: [
            [1,1,1,3,3,3,2,2,2,0,0],
            [0,0,2,2,2,2,3,3,1,1,1],
            [3,3,3,1,1,1,0,0,0,2,2],
            [2,2,0,0,0,0,1,1,3,3,3]
        ],
        numberchange: [
            [0,0,0,0,0,0,0,0,0,0,0],
            [1,1,1,1,1,1,1,1,1,1,1],
            [2,2,2,2,2,2,2,2,2,2,2],
            [3,3,3,3,3,3,3,3,3,3,3]
        ]

    };
    rowNumbers = {
        classic: [
            [2,3,4,5,6,7,8,9,10,11,12],
            [2,3,4,5,6,7,8,9,10,11,12],
            [12,11,10,9,8,7,6,5,4,3,2],
            [12,11,10,9,8,7,6,5,4,3,2]
        ],
        colorchange: [
            [2,3,4,5,6,7,8,9,10,11,12],
            [2,3,4,5,6,7,8,9,10,11,12],
            [12,11,10,9,8,7,6,5,4,3,2],
            [12,11,10,9,8,7,6,5,4,3,2]
        ],
        numberchange: [
            [6,10,2,8,3,4,12,5,9,7,11],
            [9,12,4,6,7,2,5,8,11,3,10],
            [8,2,10,12,6,9,7,4,5,11,3],
            [5,7,11,9,12,3,8,10,2,6,4]
        ]
    };

    playerThisRound: Array<Player> = [
        {name:'Michael'},
        {name:'Maja'},
        {name:'Spieler 2'}
    ];
    activePlayerNr: number = 0;
    round:number = 0;
    possibleClickValue:number; // 1 : white; 2: color; 3: color and white;

    nextActivePlayer () : number{
        this.activePlayerNr++;
        if (this.activePlayerNr >= this.playerThisRound.length) {
            this.activePlayerNr = 0;
        }
        return this.activePlayerNr;
    }

    insertData(data: string){
        this.dataArray.unshift(data);
    }
    set name(name: string) {
        this._name = (name && name.trim()) || '<no name set>';
    }
    get name() { return this._name; }
}