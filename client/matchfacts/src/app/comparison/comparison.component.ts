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
  statFields: Array<string>;
  statAbbreviations = {
    'gp': 'Games Played',
    'gs': 'Games Started',
    'min': 'Minutes',
    'fgm': 'Field Goals Made',
    'fga': 'Field Goals Attempted',
    'fgpct': 'Field Goal %',
    'fg3m': '3-point FG Made',
    'fg3a': '3-point FG Attempted',
    'fg3pct': '3-point FG %',
    'ftm': 'Free Throws Made',
    'fta': 'Free Throws Attempted',
    'ftpct': 'Free Throw %',
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
  statCategories = [
    {
      id: 0,
      name: 'All',
      fields: [
        'gp',
        'gs',
        'min',
        'fgm',
        'fga',
        'fgpct',
        'fg3m',
        'fg3a',
        'fg3pct',
        'ftm',
        'fta',
        'ftpct',
        'oreb',
        'dreb',
        'reb',
        'ast',
        'stl',
        'blk',
        'tov',
        'pf',
        'pts'
      ]
    },

    {
      id: 1,
      name: 'Scorer',
      fields: [
        'fga',
        'fgm',
        'fgpct',
        'fg3a',
        'fg3m',
        'fg3pct',
        'ftm',
        'fta',
        'ftpct',
        'pts'
      ]
    },

    {
      id: 2,
      name: 'Defender',
      fields: [
        'reb',
        'dreb',
        'stl',
        'blk'
      ]
    }
  ];

  private statFilter: number;

  onFilterSelect() {
    this.statFields = this.statCategories[this.statFilter].fields;
  }

  constructor(private nbaAPIService: NbaAPIService, private siblingService: SiblingService) {
    this.statCategories.map((category) => {
      category.fields.reverse();
    });
    this.statFilter = 0;
    this.statFields = this.statCategories[0].fields;
    this.siblingService.setStatFields(this.statFields);

  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
