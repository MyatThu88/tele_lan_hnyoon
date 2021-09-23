import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HideHeaderDirective } from './hide-header.directive';
import { FadeHeaderDirective } from './fade-header.directive';

@NgModule({
  declarations: [FadeHeaderDirective, HideHeaderDirective],
  imports: [CommonModule],
  exports: [FadeHeaderDirective, HideHeaderDirective],
})
export class SharedDirectivesModule {}
