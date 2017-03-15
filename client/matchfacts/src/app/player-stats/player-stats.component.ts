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

  private _player: Player
  @Input()
  set player(player: Player) {
    this._player = player;
  }
  get player(): Player {
    return this._player;
  }

  private _stats: Object;
  @Input()
  set stats(stats: Object) {
    this._stats = stats;
    if (this._stats) {
      this.selectedStats = this._stats['careerTotalsRegularSeason'][0];
    }
  }
  get stats(): Object {
    return this._stats;
  }

  @Input() statFields: String[];
  selectedStats: Object;

  //selectedFilter: string;
  filterSubscription: Subscription;
  playerSubscription: Subscription;

  constructor(private siblingService: SiblingService, private nbaAPIService: NbaAPIService) {
    this.filterSubscription = this.siblingService.selectedFilter$.subscribe((selectedFilter) => {
      // console.log(this.player.playerId + " received filter for " + selectedFilter['id']);
      if (this.player.playerId === selectedFilter['id']) {
        // console.log(this.player.playerId + " component will stay with " + selectedFilter['id'] + " filter.");
        this.applySelectedFilter(selectedFilter['value']);
      }
    });

    // tried to refactor and it did not go well.
    //
    // this.playerSubscription = this.siblingService.changedPlayer$.subscribe((players) => {
    //   if (this.player.playerId === players['beforeId']) {
    //     // console.log(this.player.playerId + ' changing my player!');
    //     this.player = players['now'];
    //     this.nbaAPIService.getPlayerProfile(this.player.playerId).subscribe((playerProfile) => {
    //       this.stats = playerProfile;
    //       // this.playerData = playerProfile;
    //     }, (error) => {
    //       console.log('error getting basic player info from our db');
    //     });
    //   }
    // })
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.filterSubscription.unsubscribe();
    this.playerSubscription.unsubscribe();
  }

  applySelectedFilter(selectedFilter) {
    // change selectedStats based on selectedFlter
    const selectedYear = selectedFilter.split(' ');
    console.log('split array', selectedYear);
    this.selectedStats = this._stats[selectedYear[0]][selectedYear[1]];
  }



}
