import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {FIREBASE_PROVIDERS, defaultFirebase, AngularFire, firebaseAuthConfig, AuthProviders, AuthMethods} from 'angularfire2';
import {FragenRepository} from './providers/fragen-repository/fragen-repository'


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [FragenRepository,
        FIREBASE_PROVIDERS,
        defaultFirebase({
          apiKey: "AIzaSyAvxSQSv9tSdFF1aBrJOdO3iG6s7Cd1HNw",
          authDomain: "auditmobil.firebaseapp.com",
          databaseURL: "https://auditmobil.firebaseio.com",
          storageBucket: "auditmobil.appspot.com",
        }),
        firebaseAuthConfig({
            provider: AuthProviders.Password,
            method: AuthMethods.Password,
            remember: 'default',
            scope: ['email']
        })]
})

export class MyApp {

  private rootPage:any;

  constructor(private platform:Platform) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp 
  // Initialize Firebase app  
);
