import {Modal, NavController, Page} from 'ionic-angular';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LoginPage} from '../login/login'
import {DetailPage} from '../detail/detail'
import {FragenRepository} from '../../providers/fragen-repository/fragen-repository';
import 'rxjs';
import {FirebaseAuth } from 'angularfire2';


@Page({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage implements OnInit {
    authInfo: any;
    public Fragen;

    constructor(
        private _auth: FirebaseAuth,
        private _navCtrl: NavController,
        private _frageRepo: FragenRepository) {
        // dont do anything heavy here... do it in ngOnInit
    }

    ngOnInit() {

        // subscribe to the auth object to check for the login status
        // of the user, if logged in, save some user information and
        // execute the firebase query...
        // .. otherwise
        // show the login modal page
        this._auth.subscribe((data) => {
            console.log("in auth subscribe", data)
            if (data) {
				if (data.twitter) {
					this.authInfo =  data.twitter;
				} else if (data.github) {
					this.authInfo =  data.github 
				} else {
					this.authInfo = data.auth ;
				}
                this.getFragen();

            } else {
                this.authInfo = null
                this.displayLoginModal()
            }
        })
    }

    private getFragen(){
        let that = this;
        this._frageRepo.GetFragen().subscribe((Fragen) =>{
            that.Fragen = Fragen;
        });
    }

    /**
     * displays the login window
     */
    displayLoginModal() {
        let loginPage = Modal.create(LoginPage);
        this._navCtrl.present(loginPage);
        //this._navCtrl.setRoot(LoginPage);
    }

    /**
     * adds a new item to firebase /textItems
     * 
     * pass in the auth information to the modal to associate the user with the newly
     * created entry
     */
    addNewItemClicked(_data) {
        //let newItemPage = Modal.create(NewItemModal, { "user": this.authInfo });
        //this.navCtrl.present(newItemPage);
    }

    /**
     * logs out the current user
     */
    logoutClicked() {
        if (this.authInfo && (this.authInfo.email ||  this.authInfo.accessToken)) {
            this.Fragen = null;
            this._auth.logout();
            return;
        }
    }

    goToDetail(item){
        this._navCtrl.push(DetailPage,{key:item.$key});
    }
    
}
