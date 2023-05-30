import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number): string {
    if (value <= 0) {
      return '0 seconds';
    }

    let duration = '';
    const units = [
      { label: 'month', seconds: 2592000 },
      { label: 'day', seconds: 86400 },
      { label: 'hour', seconds: 3600 },
      { label: 'minute', seconds: 60 },
      { label: 'second', seconds: 1 }
    ];

    for (const unit of units) {
      if (value >= unit.seconds) {
        const count = Math.floor(value / unit.seconds);
        duration += `${count} ${unit.label}${count > 1 ? 's' : ''} `;
        value %= unit.seconds;
      }
    }

    return duration.trim();
  }

}
