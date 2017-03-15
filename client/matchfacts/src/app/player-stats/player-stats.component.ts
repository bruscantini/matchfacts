import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Player } from '../player/player.model';
import { SiblingService } from '../shared/sibling.service';
import { NbaAPIService } from '../shared/nba-api.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss']
})
export class PlayerStatsComponent implements OnInit {
  @Input() componentId: number;
  @Input() statFields: String[];
  playerStats: Object;
  // playerData: Object;
  // selectedStats: Object;
  // @Output() statsFiltered = new EventEmitter<Object>();
  // filterSubscription: Subscription;
  playerDataSubscription: Subscription;
  //playerSubscription: Subscription;

  constructor(private siblingService: SiblingService, private nbaAPIService: NbaAPIService) {

  }

  ngOnInit() {
    if (this.componentId === 1) {
      // this.filterSubscription = this.siblingService.selectedFilter1$.subscribe((selectedFilter) => {
      //   this.applySelectedFilter(selectedFilter);
      // });

      this.playerDataSubscription = this.siblingService.changedPlayer1Data$.subscribe((playerData) => {
        console.log('component 1 changing player data');
        //console.log(playerData);
        this.playerStats = playerData;
      })
    } else {
      // this.filterSubscription = this.siblingService.selectedFilter2$.subscribe((selectedFilter) => {
      //   this.applySelectedFilter(selectedFilter);
      // });

      this.playerDataSubscription = this.siblingService.changedPlayer2Data$.subscribe((playerData) => {
        console.log('component 2 changing player data');
        //console.log(playerData);
        this.playerStats = playerData;
      })
    }
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    // this.filterSubscription.unsubscribe();
    this.playerDataSubscription.unsubscribe();
  }

  // applySelectedFilter(selectedFilter) {
  //   console.log(this.componentId + " changing filter to " + selectedFilter);
  //
  //   // change selectedStats based on selectedFlter
  //   const selectedYear = selectedFilter.split(' ');
  //   this.selectedStats = this.playerData[selectedYear[0]][selectedYear[1]];
  // }



}
