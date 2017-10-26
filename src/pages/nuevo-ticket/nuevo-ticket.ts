import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Loading, AlertController,LoadingController } from 'ionic-angular';
//import {ShareService} from '../services/ShareService';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the NuevoTicketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-nuevo-ticket',  
  templateUrl: 'nuevo-ticket.html',
})
export class NuevoTicketPage {

  idUsuario;
  ticketData = {};
  result;
  loading;
  constructor(public navCtrl: NavController, public navParams: NavParams, public vieController: ViewController,
   private alertController: AlertController, private loadingController: LoadingController, private http: Http) {
    this.idUsuario = this.navParams.get('userId');
    console.log('id: '+this.idUsuario);
  }

  doLogin(){
    let cadena='https://aaronnek99.000webhostapp.com/agregarticket.php?idusuario='+this.idUsuario+
    '&tema='+encodeURI(this.ticketData['tema'])+'&mensaje='+encodeURI(this.ticketData['mensaje']);
    this.http.get(cadena)
    .map(res => res.json())
    .subscribe(data => {
      console.log('data success');
      console.log(data); // for browser console
      this.result = data; // for UI       
      if(this.result.estado=="ok"){      
        alert('Tu ticket ha sido creado!!!');      
        this.ticketData['tema']="";      
        this.ticketData['mensaje']="";      
        this.closeModal();
      }else{
        alert("No se pudo agregar!!");
      }
    }, err => {
      console.log('error');
      this.showError("error inesperado");
    });
  }

  closeModal(){
    this.vieController.dismiss();//userProvidedData entre los parenteiss
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NuevoTicketPage');
  }
  showError(text){
    this.loading.dismiss();
    let alert = this.alertController.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
  showLoading(){
    this.loading = this.loadingController.create({
      content: 'Porfavor espera...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

}
