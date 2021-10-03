import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { MatSharedModule } from './mat-shared.module';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SummaryPipe } from './pipes/summary.pipe';
import { ChartModule } from 'angular2-chartjs';
@NgModule({
  declarations: [AppComponent, SummaryPipe],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({ _forceStatusbarPadding: true }),
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatSharedModule,
    NgCircleProgressModule.forRoot({}),
    ChartModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
