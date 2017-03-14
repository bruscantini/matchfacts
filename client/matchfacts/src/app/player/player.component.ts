import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Player } from './player.model';
import { NbaAPIService } from '../shared/nba-api.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() player: Player;
  @Input() playerData: Object;
  @Output() onSeasonSelected: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() onDataUpdated: EventEmitter<Object> = new EventEmitter<Object>();
  searchedPlayer: string;
  searchedPlayerId: string;
  //allPlayers: Object[] = [];
  dataOptGroups: String[];


  constructor(private nbaAPIService: NbaAPIService) {
    // this.dataOptGroups = [{'id': 'seasonTotalsRegularSeason', value: 'Regular Season'},
    //   {'id': 'careerTotalsRegularSeason', value: 'Career Reg',
    //   'seasonTotalsPostSeason',
    //   'careerTotalsPostSeason']
  }

  ngOnInit() {

    // We're already doing this in comparisonComponent
    // this.nbaAPIService.getPlayerProfile(this.player.playerId).subscribe((playerProfile) => {
    //   this.player.stats = playerProfile;
    //   console.log('playerStats', this.player.stats);
    // }, (error) => {
    //   console.log(error);
    // })

  }

  onYearSelect(selectedValue: string) {
    console.log(selectedValue + " was selected.");
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
        basicPlayer['lastName'], '0', basicPlayer['picture']);
    }, (error) => {
      console.log('error getting basic player info from our db');
    });

    // since update player is working, let's update the stats as well.
    this.nbaAPIService.getPlayerProfile(this.searchedPlayerId).subscribe((playerProfile) => {
      this.onDataUpdated.emit(playerProfile);
      // this.playerData = playerProfile;
    }, (error) => {
      console.log('error getting basic player info from our db');
    });
  }

  // use (ngModelChange)="onSearchChange($event)"
  // onSearchChange() {
  //   if (this.searchedPlayer) {
  //     this.nbaAPIService.getSearchedPlayers(this.searchedPlayer).subscribe((allPlayers) => {
  //       console.log(allPlayers);
  //       this.allPlayers = allPlayers.map((elem) => {
  //         return { id: elem['playerId'], value: elem['fullName'] };
  //       });
  //     }, (error) => {
  //       console.log(error);
  //     });
  //   }
  // }


}
