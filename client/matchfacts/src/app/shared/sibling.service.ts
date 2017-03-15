import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class SiblingService {

  // Observable sources
  private selectedFilter = new Subject<Object>();
  private changedPlayer = new Subject<Object>();
  private winnerMask = new Subject<Array<string>>();

  // Observable streams
  selectedFilter$ = this.selectedFilter.asObservable();
  changedPlayer$ = this.changedPlayer.asObservable();
  winnerMask$ = this.winnerMask.asObservable();

  constructor() { }

  setFilter(selectedFilter: Object) {
    this.selectedFilter.next(selectedFilter);
  }

  playerChange(players: Object) {
    this.changedPlayer.next(players);
  }

}
