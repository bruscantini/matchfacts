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
  statAbbreviations = {
    'gp': 'Games Played',
    'gs': 'Games Started',
    'min': 'Minutes',
    'fgm': 'Field Goals Made',
    'fga': 'Field Goals Attempted',
    'fgPct': 'Field Goal %',
    'fG3M': '3-point FG Made',
    'fG3A': '3-point FG Attempted',
    'fg3Pct': '3-point FG %',
    'ftm': 'Free Throws Made',
    'fta': 'Free Throws Attempted',
    'ftPct': 'Free Throw %',
    'oreb': 'Offensive Rebounds',
    'dreb': 'Defensive Rebounds',
    'reb': 'Rebounds',
    'ast': 'Assists',
    'stl': 'Steals',
    'blk': 'Blocks',
    'tov': 'Turnovers',
    'pf': 'Personal Fouls',
    'pts': 'Points'
  };

  // shooterStats = [ ];


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
