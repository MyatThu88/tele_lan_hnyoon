import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { SharedDirectivesModule } from '../../directives/shared-directives.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedComponentsModule } from '../../components/shared-components.module';

import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedDirectivesModule,
    MatIconModule,
    MatButtonModule,
    SharedComponentsModule,
    ReactiveFormsModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
