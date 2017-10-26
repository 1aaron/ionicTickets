import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TicketsDetallePage } from './tickets-detalle';

@NgModule({
  declarations: [
    TicketsDetallePage,
  ],
  imports: [
    IonicPageModule.forChild(TicketsDetallePage),
  ],
})
export class TicketsDetallePageModule {}
