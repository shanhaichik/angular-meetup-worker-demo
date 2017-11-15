import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './editor.component';
import { DownloadService } from '../../services/download.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PlayerComponent],
  exports: [PlayerComponent],
  providers: [
    DownloadService
  ]
})
export class EditorModule { }
