import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FirebaseAuth, FirebaseObjectObservable} from 'angularfire2';
import {FragenRepository} from '../../providers/fragen-repository/fragen-repository';
import {Frage, AnwortListViewModel}  from '../../shared/types';


@Component({
  templateUrl: 'build/pages/detail/detail.html',
})
export class DetailPage implements OnInit, OnDestroy {
  private _frageObserver : FirebaseObjectObservable<any>;
  public Frage: Frage;
  public AntwortenVm: AnwortListViewModel = new AnwortListViewModel();


  constructor(private _auth: FirebaseAuth,
        private _navCtrl: NavController,
        private _frageRepo: FragenRepository,
        private _navParams: NavParams) {
          
        }

  ngOnInit() {
    let key = this._navParams.get('key');
    let that = this; 
    this._frageObserver = this._frageRepo.GetFrage(key);
    this._frageObserver.subscribe(frage=>{
        that.Frage = frage;
        that.setCheckedValueOfAntowortenVm();
      })
  }
  setCheckedValueOfAntowortenVm(){
    this.AntwortenVm.Antworten.forEach(element => {
          if (element.value === this.Frage.antwort){
            element.checked = true;
          }
          else{
            element.checked = false;
          }
        });
  }
  
  setRatioValue(antwort){
    this.Frage.antwort = antwort;
    this.setCheckedValueOfAntowortenVm();
  } 

  isChecked(item){
    return item===this.Frage.antwort;
  }

  ngOnDestroy () {
    let updateItem = {"risiko":this.Frage.risiko, "antwort":this.Frage.antwort};
    this._frageObserver.update(updateItem);
  }
}
