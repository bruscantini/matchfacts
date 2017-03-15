import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Player } from '../player/player.model';
import { SiblingService } from '../shared/sibling.service';
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

  selectedFilter: string;
  subscription: Subscription;

  constructor(private siblingService: SiblingService) {
    this.subscription = this.siblingService.selectedFilter$.subscribe((selectedFilter) => {
      this.selectedFilter = selectedFilter;
    })
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

  applySelectedFilter(selectedFilter) {
    // change selectedStats based on selectedFlter
  }



}
