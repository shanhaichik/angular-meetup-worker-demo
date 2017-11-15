import {Injectable} from '@angular/core';
import {Http, ResponseContentType, Response} from '@angular/http';
import {Subject} from 'rxjs/Subject';

export const downloadOptions = {
  fullResponse: true,
  responseType: ResponseContentType.ArrayBuffer,
};

@Injectable()
export class DownloadService {
    audioStream = new Subject<ArrayBuffer>();
    private file;

    constructor(private http: Http) {
    }

    setFile(file) {
      this.file = file;
      this.downloadFile();
    }

    destroyFileLink() {
      URL.revokeObjectURL(this.file);
    }

    private downloadFile() {
      const url = this.file.name
        ? URL.createObjectURL(this.file)
        : this.file;

        this.http.get(url, downloadOptions)
          .subscribe((response: Response) => {
            this.audioStream.next(response.arrayBuffer());
          });
    }
}
