import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../player/player.model';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss']
})
export class PlayerStatsComponent implements OnInit {
  //@Input() player: Player;

  private _player: Player
  private _stats: Object;

  @Input()
  set player(player: Player) {
    this._player = player;
  }
  get player(): Player {
    return this._player;
  }

  @Input() statFields: String[];
  @Input()
  set stats(stats: Object) {
    console.log('stats have changed!');
    this._stats = stats;
    if (this._stats) {
      this.selectedStats = this._stats['careerTotalsRegularSeason'][0];
    }
  }
  get stats(): Object {
    return this._stats;
  }
  selectedStats: Object;


  constructor() {

  }

  ngOnInit() {
    //this.selectedStats = this.player.stats['careerTotalsRegularSeason'][0];
  }



}
