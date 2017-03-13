import { Component, OnInit } from '@angular/core';
import { NbaAPIService } from '../shared/nba-api.service';
import { Player } from '../player/player.model';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss']
})
export class ComparisonComponent implements OnInit {
  statFields: String[];
  player1: Object;
  player2: Object;
  player1Data: Object;
  player2Data: Object;

  constructor(private nbaAPIService: NbaAPIService) {
    this.statFields = [
      'gp',
      'gs',
      'min',
      'fgm',
      'fga',
      'fgPct',
      'fG3M',
      'fG3A',
      'fg3Pct',
      'ftm',
      'fta',
      'ftPct',
      'oreb',
      'dreb',
      'reb',
      'ast',
      'stl',
      'blk',
      'tov',
      'pf',
      'pts'
    ].reverse();

    this.player1 = new Player('893', 'Michael', 'Jordan', '23', 'http://stats.nba.com/media/players/230x185/893.png');
    this.player2 = new Player('201939', 'Stephen', 'Curry', '30', 'http://stats.nba.com/media/players/230x185/201939.png');
  }

  ngOnInit() {

  }

}
