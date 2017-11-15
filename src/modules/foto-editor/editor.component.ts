import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {imageFilter} from '../../utils/filters';


const IN_WORKER = true;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class PlayerComponent implements OnInit {
  worker: Worker;
  @ViewChild('wrapper') wrapper: ElementRef;
  showText = true;
  inProgress = false;

  ngOnInit() {
    if (IN_WORKER) {
      this.createWorker();
    }
  }

  @HostListener('drop', ['$event'])
  onDrog(event) {
    event.preventDefault();

    Array.from(event.dataTransfer.files)
      .forEach((image: File) => {
          this.addImage(image);
      });
  }

  @HostListener('dragenter', ['$event'])
  @HostListener('dragover', ['$event'])
  onDragOver(event) {
    event.preventDefault();
  }

  private addImage(img: File) {
    const imageCanvas = document.createElement('canvas');
    const imageContext = imageCanvas.getContext('2d');
    const image = new Image();
    const url = URL.createObjectURL(img);

    image.addEventListener('load', () => {
      URL.revokeObjectURL(url);
      this.inProgress = true;

      imageCanvas.width = WIDTH;
      imageCanvas.height = HEIGHT;

      imageContext.drawImage(image, 0, 0, WIDTH, HEIGHT);

      const imageData = imageContext.getImageData(0, 0, WIDTH, HEIGHT);

      if (IN_WORKER) {
        // In worker
        this.worker.postMessage({
          imageBuffer: imageData.data.buffer,
          width: imageData.width,
          height: imageData.height
        }, [imageData.data.buffer]);
      } else {
        // In main tread
        const filteredImage = imageFilter(imageData);

        this.appendImage(filteredImage);
      }
    });

    image.src = url;
  }

  private createWorker() {
    this.worker = new Worker('./worker.bundle.js');

    this.worker.onmessage = event => {
        const castBuffer = new Uint8ClampedArray(event.data.imageBuffer);
        const processedImageData = new ImageData(castBuffer, event.data.width, event.data.height);

        this.inProgress = false;
        this.appendImage(processedImageData);
    };
  }

  private appendImage(filteredImage) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = filteredImage.width;
    canvas.height = filteredImage.height;

    ctx.putImageData(filteredImage, 0, 0);

    this.showText = false;
    this.wrapper.nativeElement.appendChild(canvas);
  }
}



