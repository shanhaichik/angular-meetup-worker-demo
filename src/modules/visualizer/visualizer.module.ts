import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VisualizerComponent } from './visualizer.component';

@NgModule({
  declarations: [
    VisualizerComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [],
  exports: [VisualizerComponent],
})
export class VisualizerModule { }
