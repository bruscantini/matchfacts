import { Component, OnInit, Input} from '@angular/core';
import { Player } from './player.model';
import { NbaAPIService } from '../shared/nba-api.service';
import { SiblingService } from '../shared/sibling.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() componentId: number;
  player: Player;
  playerData: Object;
  searchedPlayer: string;
  searchedPlayerId: string;

  constructor(private nbaAPIService: NbaAPIService, private siblingService: SiblingService) {

  }

  ngOnInit() {
    if (this.componentId === 1) {
      this.player = new Player('893', 'Michael', 'Jordan', '23', 'http://stats.nba.com/media/players/230x185/893.png');

    } else {
      this.player = new Player('201939', 'Stephen', 'Curry', '30', 'http://stats.nba.com/media/players/230x185/201939.png');
    }

    this.nbaAPIService.getPlayerProfile(this.player.playerId).subscribe((playerProfile) => {
      this.playerData = playerProfile;
      // update player data in service
      this.siblingService.dataChange(this.componentId, playerProfile);
    }, (error) => {
      console.log('error getting player profile from nba api');
    });
  }

  onYearSelect(selectedValue: string) {
    this.siblingService.setFilter(this.componentId, selectedValue);
  }

  // Autocomplete uses this Observable.
  getSearchedPlayers() {
    return this.nbaAPIService.getSearchedPlayers(this.searchedPlayer);
  }

  searchValueFormatter = (data: any) => {
    this.searchedPlayerId = data['id'];
    return `${data['value']}`;
  }

  myListFormatter = (data: any): string => {
    //console.log(data);
    let html: string = "";
    html += data['value'] ? `<span>${data['value']}</span>` : data;
    return html;
  }

  itemIsSelected(event) {
    // let's update player - this should repaint the component
    this.nbaAPIService.getPlayer(this.searchedPlayerId).subscribe((basicPlayer) => {
      this.player = new Player(basicPlayer['playerId'], basicPlayer['firstName'],
        basicPlayer['lastName'], basicPlayer['number'] || '0', basicPlayer['picture']);
      // this.siblingService.playerChange(this.componentId, this.player);
    }, (error) => {
      console.log('error getting basic player info from our db');
    });

    // since update player is working, let's update the stats as well.
    this.nbaAPIService.getPlayerProfile(this.searchedPlayerId).subscribe((playerProfile) => {

      this.playerData = playerProfile;
      this.siblingService.dataChange(this.componentId, playerProfile);
    }, (error) => {
      console.log('error getting player profile from nba api');
    });
  }


}
