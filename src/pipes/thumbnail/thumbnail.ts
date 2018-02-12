import {Pipe, PipeTransform} from '@angular/core';

/**
 * Generated class for the ThumbnailPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'thumbnail',
})
export class ThumbnailPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(url: string, size: string): string {

    let stringParts: String[];
    let newUrl: string;

    if (size === 'large') {
      stringParts = url.split('.');
      newUrl = stringParts[0] + '-tn640.png';
      return newUrl;
    } else if (size === 'medium') {
      stringParts = url.split('.');
      newUrl = stringParts[0] + '-tn320.png';
      return newUrl;
    } else if (size === 'small') {
      stringParts = url.split('.');
      newUrl = stringParts[0] + '-tn160.png';
      return newUrl;
    } else if (size === 'screenshot') {
      return url;
    } else {
      return url;
    }
  }

}
