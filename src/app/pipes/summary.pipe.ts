import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summary',
})
export class SummaryPipe implements PipeTransform {
  value;
  transform(value: string, maxWords: number) {
    if (value) this.value = value;
    return (
      value.substring(0, maxWords) +
      "... <a href='#' (click)='getAllText()'>Read more</a>"
    );
  }
  getAllText() {
    return this.value;
  }
}
