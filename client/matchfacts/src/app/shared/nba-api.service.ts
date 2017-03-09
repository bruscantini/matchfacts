import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class NbaAPIService {

  constructor(private http: Http) { }

  getPlayerProfile(playerId: string): Observable<Object> {
    //this.http.get(`local`)
    return new Observable;
  }

}
