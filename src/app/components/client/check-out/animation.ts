import { stat } from 'fs';
import { trigger, style, state, transition, animate } from '@angular/animations';

export const slideUp = trigger('slideUp', [
    state('void', style({ height: '0', opacity: '0' })),
    transition('* <=> void', [
      style({ height: '*', opacity: '1' }),
      animate('250ms ease-in-out')
    ])
  ]);