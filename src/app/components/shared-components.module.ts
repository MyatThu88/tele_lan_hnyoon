import { NgModule } from '@angular/core';
import { RatingChartComponent } from './rating-chart/rating-chart.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { DrawerComponent } from './drawer/drawer.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [RatingChartComponent, SearchResultComponent, DrawerComponent],
  exports: [RatingChartComponent, SearchResultComponent, DrawerComponent],
})
export class SharedComponentsModule {}
