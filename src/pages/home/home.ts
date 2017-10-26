import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Loading, AlertController,LoadingController } from 'ionic-angular';
import { NuevoTicketPage } from '../nuevo-ticket/nuevo-ticket';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ShareService} from '../services/ShareService';
import { TicketsDetallePage } from '../tickets-detalle/tickets-detalle';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  idUsuario = null;
  loading: Loading;
  myData;
  cabecera="#"+" ".repeat(5)+"Resumen";

  constructor(public navCtrl: NavController, private navParams: NavParams, private alertCtrl: AlertController,
    private modalCtrl: ModalController,private loadingCtrl: LoadingController,public http: Http, private shareService: ShareService) {
    this.idUsuario = this.shareService.getUserId();//navParams.get('idUsuario');
    this.cargarTickets();
  }

  cargarTickets(){
    this.showLoading();
    this.http.get('https://aaronnek99.000webhostapp.com/tickets.php?idusuario='+this.idUsuario)
     .map(res => res.json())
    .subscribe(data => {
      this.myData = data.records;
      //this.loading.dismiss();
  }, err => {
    console.log(err);
    this.showError("error de red");
  });
    
  }
  ticket;
  mostrarTicket(item)  
  {  
    this.ticket=item;
    this.navCtrl.push(TicketsDetallePage,{"ticket":this.ticket});  
  };

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
  nuevoTicket() {
    let ticketModal = this.modalCtrl.create(NuevoTicketPage,{userId: this.idUsuario});
    ticketModal.onDidDismiss(data => {
      //this.userName = data.userName;
      this.cargarTickets();
      this.loading.dismiss();
    });
    ticketModal.present();
  }
  padLeft(nr, n, str){    
        return Array(n-String(nr).length+1).join(str||'0')+nr;
    }
}
