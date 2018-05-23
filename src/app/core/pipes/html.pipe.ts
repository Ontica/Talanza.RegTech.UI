
import { Pipe, PipeTransform } from '@angular/core';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'html'
})
export class HtmlPipe implements PipeTransform  {

  constructor(private sanitized: DomSanitizer) {}

  transform(value) {
    if (value) {
      return this.sanitized.bypassSecurityTrustHtml(value);
    } else {
      return '';
    }
  }

}
