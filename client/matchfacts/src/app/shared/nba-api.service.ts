import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { environment } from '../../environments/environment';

@Injectable()
export class NbaAPIService {

  apiEndpoint = environment.baseEndpoint + environment.apiEndpoint;
  allPlayers: Object[];

  constructor(private http: Http) { }

  getAllPlayers(): Observable<Array<Object>> {
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers});
    return this.http.get(this.apiEndpoint)
      .map(this.extractData).catch(this.handleError);
  }

  getSearchedPlayers(searchedPlayer: string): Observable<Array<Object>> {
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers, body: JSON.stringify(searchedPlayer) });
    console.log(this.apiEndpoint);
    return this.http.get(this.apiEndpoint + 'searchedPlayer/' + searchedPlayer)
      .map(this.extractData).map((obj) => {
        return obj.map((elem) => {
          return { id: elem.playerId, value: elem.fullName };
        });
      }).catch(this.handleError);
  }

  getPlayerProfile(playerId: string): Observable<Object> {
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });

    return this.http.get(this.apiEndpoint + 'profile/' + playerId)
      .map(this.extractData).catch(this.handleError);

  }

  getPlayer(playerId: string): Observable<Object> {
    return this.http.get(this.apiEndpoint + 'getPlayer/' + playerId)
      .map(this.extractData).catch(this.handleError);
  }

  extractData(resp: Response) {
    //console.log(resp.json());
    return resp.json();
  }

  handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
