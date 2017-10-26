import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NewMessagePage } from '../new-message/new-message';
import { ShareService } from '../services/ShareService';
/**
 * Generated class for the TicketsDetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tickets-detalle',
  templateUrl: 'tickets-detalle.html',
})
export class TicketsDetallePage {

  ticket;
  idticket;
  myData = [];
  loading;
  idUser;
  constructor(private modalCtrl: ModalController, private alertCtrl: AlertController,private loadingCtrl: LoadingController,
     public navCtrl: NavController, public navParams: NavParams, private http: Http, private share: ShareService) {
    this.ticket = navParams.get('ticket');
    share.setTicket(this.ticket);
    this.idticket = this.ticket.idticket;
    this.idUser = share.getUserId();
    this.cargarMensajes();
  }

  cargarMensajes(){
    this.showLoading();
    let cadena='http://aaronnek99.000webhostapp.com/mensajes.php?idticket='+this.idticket;
    this.http.get(cadena)
    .map(res => res.json())
    .subscribe(data => {
      this.myData = data.records;
      //this.loading.dismiss();
    }, err => {
      console.log(err);
      this.showError("error de red");
    });
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

  NuevoMensaje(){
    let messageModal = this.modalCtrl.create(NewMessagePage,{
      'userId': this.idUser, 
      'ticket': this.ticket});
    messageModal.onDidDismiss(data => {
      this.cargarMensajes();
      this.loading.dismiss();
    });
    messageModal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TicketsDetallePage');
  }

}
