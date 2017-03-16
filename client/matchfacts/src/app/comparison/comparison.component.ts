import { Component, OnInit } from '@angular/core';
import { NbaAPIService } from '../shared/nba-api.service';
import { Player } from '../player/player.model';
import { SiblingService } from '../shared/sibling.service';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss'],
  providers: [SiblingService]
})
export class ComparisonComponent implements OnInit {
  statFields: String[];

  constructor(private nbaAPIService: NbaAPIService, private siblingService: SiblingService) {
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
    window.scrollTo(0, 0);
  }

}
