import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-player-stats',
  templateUrl: './player-stats.component.html',
  styleUrls: ['./player-stats.component.scss']
})
export class PlayerStatsComponent implements OnInit {
  @Input() stats: Object;
  constructor() { }

  ngOnInit() {
  }

}
