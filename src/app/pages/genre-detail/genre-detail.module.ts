import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenreDetailPageRoutingModule } from './genre-detail-routing.module';

import { GenreDetailPage } from './genre-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenreDetailPageRoutingModule
  ],
  declarations: [GenreDetailPage]
})
export class GenreDetailPageModule {}
