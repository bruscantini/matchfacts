import { Component, OnInit } from '@angular/core';
import { NbaAPIService } from '../shared/nba-api.service';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss']
})
export class ComparisonComponent implements OnInit {
  statFields: String[];
  // allPlayers: Object[];
  // allPlayersNames: Object[];

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
  }

  ngOnInit() {

  }

}
