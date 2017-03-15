import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class SiblingService {

  private actualPlayer1Data: Object;
  private actualPlayer2Data: Object;

  // Observable sources
  // private selectedFilter1 = new Subject<String>();
  // private selectedFilter2 = new Subject<String>();
  // private player1 = new Subject<Object>();
  // private player2 = new Subject<Object>();
  private player1Data = new Subject<Object>();
  private player2Data = new Subject<Object>();

  // Observable streams
  // selectedFilter1$ = this.selectedFilter1.asObservable();
  // selectedFilter2$ = this.selectedFilter2.asObservable();
  // changedPlayer1$ = this.player1.asObservable();
  // changedPlayer2$ = this.player2.asObservable();
  changedPlayer1Data$ = this.player1Data.asObservable();
  changedPlayer2Data$ = this.player2Data.asObservable();

  constructor() { }

  // setFilter(componentId: number, selectedFilter: string) {
  //   if (componentId === 1 && this.actualPlayer1Data) {
  //     this.selectedFilter1.next(selectedFilter);
  //   } else {
  //     this.selectedFilter2.next(selectedFilter);
  //   }
  //
  //   // greenify the winners
  // }

  // playerChange(componentId: number, player: Object) {
  //   if (componentId === 1) {
  //     this.player1.next(player);
  //   } else {
  //     this.player2.next(player);
  //   }
  // }

  convertToDisplayableForm(playerData) {
    const keys = Object.keys(playerData);
    let result = {};
    keys.forEach((key) => {
      result[key] = { value: playerData[key], win: false };
    });
    return result;
  }

  dataChange(componentId: number, data: Object) {
    if (componentId === 1) {
      this.actualPlayer1Data = this.convertToDisplayableForm(data);

    } else {
      this.actualPlayer2Data = this.convertToDisplayableForm(data);
    }
    this.compareStats();
  }

  // called when playerData or filter changes.
  private compareStats() {
    if (this.actualPlayer1Data && this.actualPlayer2Data) {
      // do comparison by modifying actualPlayerData and send both;
      console.log('we must now compare');
      const fields = Object.keys(this.actualPlayer1Data);
      fields.forEach((field) => {
        if (!(field in this.actualPlayer1Data) || !(field in this.actualPlayer2Data)) {
          console.log('somebody is missing a field');
          return;
        }
        if (this.actualPlayer1Data[field]['value'] > this.actualPlayer2Data[field]['value']) {
          this.actualPlayer1Data[field]['win'] = true;
          this.actualPlayer2Data[field]['win'] = false;
        } else {
          this.actualPlayer2Data[field]['win'] = true;
          this.actualPlayer1Data[field]['win'] = false;
        }
      });
      this.player1Data.next(this.actualPlayer1Data);
      this.player2Data.next(this.actualPlayer2Data);
    } else {
      if (this.actualPlayer1Data) this.player1Data.next(this.actualPlayer1Data);
      if (this.actualPlayer2Data) this.player2Data.next(this.actualPlayer2Data);
    }
  }

}
