import { Component, OnInit, Input } from '@angular/core';
import { Player } from './player.model';
import { NbaAPIService } from '../shared/nba-api.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() playerId: number;
  player: Player;
  player1: Player;
  player2: Player;

  constructor(private nbaAPIService: NbaAPIService) {
    this.player1 = new Player('Michael', 'Jordan', '23', 'http://stats.nba.com/media/players/230x185/893.png');
    this.player2 = new Player('Stephen', 'Curry', '30', 'http://stats.nba.com/media/players/230x185/201939.png');

  }

  ngOnInit() {
    console.log('playerId ', this.playerId);
    if (this.playerId === 1) this.player = this.player1;
    else this.player = this.player2;

    /*
    this.nbaAPIService.getPlayers().subscribe((allPlayers) => {
      console.log(allPlayers);
    }, (error) => {
      console.log(error);
    });
    */

    this.nbaAPIService.getPlayerProfile('893').subscribe((playerProfile) => {
      console.log(playerProfile);
    }, (error) => {
      console.log(error);
    })
  }

}
