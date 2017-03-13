import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class PlayerDataService {
  dataEmitter: EventEmitter<Object> = new EventEmitter<Object>();
  playerData: Object;
  constructor() { }

}
