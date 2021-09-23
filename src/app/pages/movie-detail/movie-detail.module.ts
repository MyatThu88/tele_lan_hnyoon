import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieDetailPageRoutingModule } from './movie-detail-routing.module';

import { SharedDirectivesModule } from '../../directives/shared-directives.module';
import { MovieDetailPage } from './movie-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieDetailPageRoutingModule,
    SharedDirectivesModule,
  ],
  declarations: [MovieDetailPage],
})
export class MovieDetailPageModule {}
