import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class NbaAPIService {

  apiEndpoint = 'http://localhost:3000/api/player/';
  allPlayers: Object[];

  constructor(private http: Http) { }

  getPlayers(): Observable<Array<Object>> {
    // if (this.allPlayers) return new Observable((observer) => {
    //   observer.next(this.allPlayers);
    //   observer.complete();
    // });
    return this.http.get(this.apiEndpoint)
      .map(this.extractData).catch(this.handleError);
  }

  getPlayerProfile(playerId: string): Observable<Object> {
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: headers });

    return this.http.get(this.apiEndpoint + playerId)
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