import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouteReuseStrategy } from '@angular/router';

import { MatSharedModule } from './mat-shared.module';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SummaryPipe } from './pipes/summary.pipe';
import { IonicStorageModule } from '@ionic/storage-angular';
import { ChartModule } from 'angular2-chartjs';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
@NgModule({
  declarations: [AppComponent, SummaryPipe],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot({ _forceStatusbarPadding: true }),
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatSharedModule,
    IonicStorageModule.forRoot(),
    NgCircleProgressModule.forRoot({}),
    ChartModule,
    MatSnackBarModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
