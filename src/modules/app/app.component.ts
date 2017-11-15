import { Component } from '@angular/core';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public audio: AudioService) {}
}
