import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class SiblingService {

  // Observable sources
  private selectedFilter = new Subject<string>();
  private winnerMask = new Subject<Array<string>>();

  // Observable streams
  selectedFilter$ = this.selectedFilter.asObservable();
  winnerMask$ = this.winnerMask.asObservable();

  constructor() { }

  setFilter(selectedFilter: string) {
    this.selectedFilter.next(selectedFilter);
  }

}
