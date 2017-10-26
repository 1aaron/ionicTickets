import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import { ShareService } from '../services/ShareService';
/**
 * Generated class for the NewMessagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-message',
  templateUrl: 'new-message.html',
})
export class NewMessagePage {

  mensaje;
  idUsuario;
  ticket;
  loading;

  constructor(private alertCtrl: AlertController, private loadingCtrl: LoadingController, 
    private vieController: ViewController, public navCtrl: NavController, public navParams: NavParams,
    private http: Http) {
    this.ticket = navParams.get('ticket');
    console.log("ticket recibido: "+this.ticket);
    
    this.idUsuario = navParams.get('userId');
    console.log("usuario recibido: "+this.idUsuario);

    // this.ticket = share.getTicket();
    // console.log("ticket recibido: "+this.ticket);

    // this.idUsuario = share.getUserId();
    // console.log("usuario recibido: "+this.idUsuario);
  }

  showLoading(){
    this.loading = this.loadingCtrl.create({
      content: 'Porfavor espera...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
  showError(text){
    //this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }

  doLogin(){
    this.showLoading();
    let cadena = 'http://aaronnek99.000webhostapp.com/agregarmensaje.php?de='+this.idUsuario+'&para='+this.ticket.asignado+'&idticket='+this.ticket.idticket+'&mensaje='+encodeURI(this.mensaje);
    this.http.get(cadena)
    .map(res => res.json())
    .subscribe(data =>{  
      if(data.estado=="ok"){  
        alert('Tu mensaje ha sido creado!!!'); 
        this.mensaje="";
        this.loading.dismiss();
        this.cerrar();
      }
    }, err =>{
      console.log(err);
      this.showError('error');
    })
  }
  cerrar(){
    this.vieController.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewMessagePage');
  }

}
