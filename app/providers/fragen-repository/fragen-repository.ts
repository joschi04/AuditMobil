import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import {Observable}     from 'rxjs/Observable';

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";


/*
  Generated class for the FragenRepository provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
export class File{
  public Titel:string;
}

@Injectable()
export class FragenRepository {
    constructor(private _af: AngularFire){
      
    }   

    public GetFragen(){
      return this._af.database.list("/fragen/")
            .catch(this.handleError);
    }

    private handleError (error) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error || 'Server error');
    }
}

