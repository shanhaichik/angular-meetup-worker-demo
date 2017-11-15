import {Component, HostBinding, HostListener, OnDestroy, OnInit} from '@angular/core';
import {DownloadService} from '../../services/download.service';
import {AudioService} from '../../services/audio.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit, OnDestroy {
  @HostBinding('class.hidden') hidden = false;
  border = false;

  constructor(private dowload: DownloadService,
              private audio: AudioService) { }

  ngOnInit() {
    this.dowload.audioStream
      .subscribe((audioBuffer: ArrayBuffer) => {
        this.audio.initialize(audioBuffer);
        this.hidden = true;
      });
  }

  ngOnDestroy() {
    this.dowload.destroyFileLink();
  }

  @HostListener('drop', ['$event'])
  onDrog(event) {
    event.preventDefault();
    this.dowload.setFile(event.dataTransfer.files[0]);
  }

  @HostListener('dragenter', ['$event'])
  @HostListener('dragover', ['$event'])
  onDragOver(event) {
    event.preventDefault();
    this.border = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event) {
    event.preventDefault();
    this.border = false;
  }

  @HostListener('document:click')
  stopMusic() {
    if (this.audio.isPlay) {
      this.audio.stop();
    } else {
      this.audio.play();
    }
    this.hidden = this.audio.isPlay;
  }

}
