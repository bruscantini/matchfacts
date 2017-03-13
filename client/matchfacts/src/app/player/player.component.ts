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
  @Output() onSeasonSelected: EventEmitter<Object> = new EventEmitter<Object>();
  searchedPlayer: string;
  searchedPlayerId: string;
  allPlayers: Object[] = [];

  constructor(private nbaAPIService: NbaAPIService) {


  }

  ngOnInit() {

    this.nbaAPIService.getPlayerProfile(this.player.playerId).subscribe((playerProfile) => {
      this.player.stats = playerProfile;
      //console.log(playerProfile);
    }, (error) => {
      console.log(error);
    })

    // this.nbaAPIService.getAllPlayers().subscribe((allPlayers) => {
    //   console.log(allPlayers);
    //   this.allPlayers = allPlayers.map((elem) => {
    //     return { id: elem['playerId'], value: elem['fullName'] };
    //   });
    // }, (error) => {
    //   console.log(error);
    // });
  }

  getSearchedPlayers() {
    return this.nbaAPIService.getSearchedPlayers(this.searchedPlayer);
  }

  // use (ngModelChange)="onSearchChange($event)"
  onSearchChange() {
    if (this.searchedPlayer) {
      this.nbaAPIService.getSearchedPlayers(this.searchedPlayer).subscribe((allPlayers) => {
        console.log(allPlayers);
        this.allPlayers = allPlayers.map((elem) => {
          return { id: elem['playerId'], value: elem['fullName'] };
        });
      }, (error) => {
        console.log(error);
      });
    }
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
    console.log(this.searchedPlayerId + ' is the selected id!');
    // let's change a variable so app-stats refreshes.
  }


}
