import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class SiblingService {

  private actualPlayer1Data: Object;
  private actualPlayer2Data: Object;

  // Observable sources
  private player1Data = new Subject<Object>();
  private player2Data = new Subject<Object>();

  // Observable streams
  changedPlayer1Data$ = this.player1Data.asObservable();
  changedPlayer2Data$ = this.player2Data.asObservable();

  constructor() { }

  // gives the playerData a value key and a win key for each field.
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
      if (!data) {
        this.actualPlayer1Data = null;
        this.player1Data.next(this.actualPlayer1Data);
      }
      else {
        this.actualPlayer1Data = this.convertToDisplayableForm(data);
      }

    } else {
      if (!data) {
        this.actualPlayer2Data = null;
        this.player2Data.next(this.actualPlayer2Data);
      }
      else {
        this.actualPlayer2Data = this.convertToDisplayableForm(data);
      }
    }
    this.compareStats();
  }

  // called when playerData changes.
  private compareStats() {
    if (this.actualPlayer1Data && this.actualPlayer2Data) {
      // do comparison by modifying actualPlayerData and send both
      const fields = Object.keys(this.actualPlayer1Data);
      fields.forEach((field) => {
        //field = field.toLowerCase();
        if (!(field in this.actualPlayer1Data) || !(field in this.actualPlayer2Data)) {
          console.log('somebody is missing a field: ' + field);
          // we might need to return the data with missing field. else, it doesn't
          // get updated.
          return;
        }

        // TOV & PF exception
        let WINNER = true;
        if (field.toLowerCase() === 'tov' || field.toLowerCase() === 'pf') {
          WINNER = false;
        }

        if (this.actualPlayer1Data[field]['value'] > this.actualPlayer2Data[field]['value']) {
          this.actualPlayer1Data[field]['win'] = WINNER;
          this.actualPlayer2Data[field]['win'] = !WINNER;
        } else if (this.actualPlayer1Data[field]['value'] < this.actualPlayer2Data[field]['value']) {
          this.actualPlayer2Data[field]['win'] = WINNER;
          this.actualPlayer1Data[field]['win'] = !WINNER;
        } else {
          this.actualPlayer1Data[field]['win'] = false;
          this.actualPlayer2Data[field]['win'] = false;
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
