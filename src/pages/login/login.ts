import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Loading, AlertController,LoadingController} from 'ionic-angular';
import {MenuController} from 'ionic-angular';
import { HomePage } from '../home/home';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ShareService} from '../services/ShareService';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  login = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController,
     private alertCtrl: AlertController,private loadingCtrl: LoadingController,public http: Http,
     private shareService: ShareService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.menuCtrl.get().enable(false)
  }

  showLoading(){
    this.loading = this.loadingCtrl.create({
      content: 'Porfavor espera...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
  
  response = "";
  idUsuario;
  tryLogin(){
    this.showLoading();
    this.http.get('https://aaronnek99.000webhostapp.com/usuarios.php?correo='+this.login['user']+'&contrasena='+this.login['contrasena'])
    .map(res => res.json())
    .subscribe(data => {
      this.response = data.estado;
      if(this.response === "encontrado"){
        this.idUsuario = data.idusuario;
        this.shareService.setUserId(this.idUsuario);
        this.menuCtrl.get().enable(true);
        this.navCtrl.setRoot(HomePage);//,{idUsuario: this.idUsuario}
      }else{
        this.showError("No encontrado");
      }
  }, err => {
    console.log('error');
    this.showError("error de red");
  });
    
  }
  showError(text){
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
} 
