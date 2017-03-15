import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class SiblingService {

  // Observable sources
  private selectedFilter1 = new Subject<String>();
  private selectedFilter2 = new Subject<String>();
  private player1 = new Subject<Object>();
  private player2 = new Subject<Object>();
  private player1Data = new Subject<Object>();
  private player2Data = new Subject<Object>();
  private p1WinnerMask = new Subject<Array<string>>();
  private p2WinnerMask = new Subject<Array<string>>();

  // Observable streams
  selectedFilter1$ = this.selectedFilter1.asObservable();
  selectedFilter2$ = this.selectedFilter2.asObservable();
  changedPlayer1$ = this.player1.asObservable();
  changedPlayer2$ = this.player2.asObservable();
  changedPlayer1Data$ = this.player1Data.asObservable();
  changedPlayer2Data$ = this.player2Data.asObservable();
  winnerMask1$ = this.p1WinnerMask.asObservable();
  winnerMask2$ = this.p2WinnerMask.asObservable();

  constructor() { }

  setFilter(componentId: number, selectedFilter: string) {
    if (componentId === 1) {
      this.selectedFilter1.next(selectedFilter);
    } else {
      this.selectedFilter2.next(selectedFilter);
    }
  }

  playerChange(componentId: number, player: Object) {
    if (componentId === 1) {
      this.player1.next(player);
    } else {
      this.player2.next(player);
    }
  }

  dataChange(componentId: number, data: Object) {
    if (componentId === 1) {
      this.player1Data.next(data);
    } else {
      this.player2Data.next(data);
    }
  }

}
