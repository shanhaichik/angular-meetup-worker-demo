import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlayerModule } from '../player/player.module';
import { HttpModule } from '@angular/http';
import { VisualizerModule } from '../visualizer/visualizer.module';
import { EditorModule } from '../foto-editor/editor.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PlayerModule,
    HttpModule,
    VisualizerModule,
    EditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
