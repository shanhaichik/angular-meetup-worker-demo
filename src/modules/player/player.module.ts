import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { AudioService } from '../../services/audio.service';
import { DownloadService } from '../../services/download.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PlayerComponent],
  exports: [PlayerComponent],
  providers: [
    DownloadService,
    AudioService
  ]
})
export class PlayerModule { }
