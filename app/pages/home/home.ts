import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {FragenRepository} from '../../providers/fragen-repository/fragen-repository';
import {FirebaseAuth, FirebaseRef, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage  {

public Fragen;

  constructor(private _auth: FirebaseAuth, private _frageRepo: FragenRepository) {

      this.Login();
  }

  private  Login(){
    let credentials = {"email":"abc@gmail.com","password":"abcdef"};
    this._auth.login(credentials, {
            provider: AuthProviders.Password,
            method: AuthMethods.Password
        }).then((authData) => {
            console.log(authData)

        }).then((value) => {
            this.GetFragen();
        }).catch((error) => {
            console.log(error);
        });
  }

  private GetFragen(){
    let that = this;
      this._frageRepo.GetFragen().subscribe((Fragen) =>{
        that.Fragen = Fragen;
      });
  }
}
