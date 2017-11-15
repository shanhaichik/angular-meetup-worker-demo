import {Component, ElementRef, ViewChild, OnInit, OnDestroy} from '@angular/core';
import {AudioService} from '../../services/audio.service';

const CANVAS_WIDTH = document.body.clientWidth;
const CANVAS_HEIGHT = 150;

const SPACER_WIDTH = 10;
const BAR_WIDTH = 5;
const OFFSET = 100;
const numBars = Math.round(CANVAS_WIDTH / SPACER_WIDTH);

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.template.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit, OnDestroy {
  @ViewChild('canvas') canvas: ElementRef;
  private context: CanvasRenderingContext2D;
  private animationId: number;

  constructor(private audio: AudioService) {
  }

  ngOnInit() {
    this.context = this.canvas.nativeElement.getContext('2d');

    this.canvas.nativeElement.width = CANVAS_WIDTH;
    this.canvas.nativeElement.height = CANVAS_HEIGHT;

    if (this.audio.isPlay) {
      this.render();
    }
  }

  ngOnDestroy() {
    window.cancelAnimationFrame(this.animationId);
  }

  private render() {
    this.animationId = window.requestAnimationFrame(this.render.bind(this));

    this.context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.context.fillStyle = '#EC167F';

    for (let i = 0; i < numBars; ++i) {
      const magnitude = this.audio.analazerByteData[i + OFFSET];

      this.context.fillRect(i * SPACER_WIDTH, CANVAS_HEIGHT, BAR_WIDTH, -magnitude);
    }
  }

}

