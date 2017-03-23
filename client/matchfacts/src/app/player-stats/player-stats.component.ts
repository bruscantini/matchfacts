import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Player } from '../player/player.model';
import { SiblingService } from '../shared/sibling.service';
import { NbaAPIService } from '../shared/nba-api.service';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss']
})
export class PlayerStatsComponent implements OnInit {
  @Input() componentId: number;
  @Input() statFields: Array<string>;
  playerStats: Object;
  playerDataSubscription: Subscription;
  statFieldsSubscription: Subscription;

  // removed private nbaAPIService: NbaAPIService
  constructor(private siblingService: SiblingService) {

  }

  ngOnInit() {
    this.statFieldsSubscription = this.siblingService.changedStatFields$.subscribe((statFields) => {
      this.statFields = statFields;
    });
    if (this.componentId === 1) {
      this.playerDataSubscription = this.siblingService.changedPlayer1Data$.subscribe((playerData) => {
        this.playerStats = playerData;
      })
    } else {
      this.playerDataSubscription = this.siblingService.changedPlayer2Data$.subscribe((playerData) => {
        this.playerStats = playerData;
      })
    }
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.playerDataSubscription.unsubscribe();
    this.statFieldsSubscription.unsubscribe();
  }
}
