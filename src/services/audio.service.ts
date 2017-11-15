import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AudioService {
  isPlay = false;
  togglePlayStream = new Subject<boolean>();
  private audioBuffer: AudioBuffer;
  private context: AudioContext = new AudioContext();
  private audioSource: AudioBufferSourceNode;
  private analyser: AnalyserNode;

  get analazerByteData() {
    const byteData = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(byteData);

    return byteData;
  }

  initialize(fileData: ArrayBuffer) {
    this.context.decodeAudioData(fileData)
      .then(decoded => {
        this.audioBuffer = decoded;
        this.analyser = this.context.createAnalyser();
        this.play();
      });
  }

  play() {
    this.createSource();
    this.audioSource.start(0);
    this.isPlay = true;
    this.togglePlayStream.next(this.isPlay);
  }

  stop() {
    this.audioSource.stop(0);
    this.isPlay = false;
    this.togglePlayStream.next(this.isPlay);
  }

  private createSource() {
    this.audioSource = this.context.createBufferSource();
    this.audioSource.buffer = this.audioBuffer;
    this.audioSource.connect(this.context.destination);
    this.audioSource.connect(this.analyser);
    this.analyser.connect(this.context.destination);
  }
}
