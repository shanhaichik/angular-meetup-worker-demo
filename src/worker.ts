import { imageFilter } from './utils/filters';

const sendMessage: any = self.postMessage;

onmessage = event => {
  const castBuffer = new Uint8ClampedArray(event.data.imageBuffer);
  const processedImageData = new ImageData(castBuffer, event.data.width, event.data.height);
  const filtered = imageFilter(processedImageData);

  sendMessage({
    imageBuffer: filtered.data.buffer,
    width: filtered.width,
    height: filtered.height
  }, [filtered.data.buffer]);
};
