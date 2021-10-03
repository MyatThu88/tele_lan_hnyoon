import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MovieDetailPageRoutingModule } from './movie-detail-routing.module';

import { SharedDirectivesModule } from '../../directives/shared-directives.module';
import { MovieDetailPage } from './movie-detail.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { ChartModule } from 'angular2-chartjs';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MovieDetailPageRoutingModule,
    SharedDirectivesModule,
    SharedComponentsModule,
    ChartModule,
  ],
  declarations: [MovieDetailPage],
})
export class MovieDetailPageModule {}
