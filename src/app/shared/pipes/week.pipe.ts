import { Pipe, PipeTransform } from '@angular/core';
import { Week } from '@app/models';
import * as moment from 'moment';

@Pipe({
  name: 'week',
})
export class WeekPipe implements PipeTransform {
  transform(week: Week): string {
    return moment(week.value).format('[Week of] MMMM D, YYYY ');
  }
}
