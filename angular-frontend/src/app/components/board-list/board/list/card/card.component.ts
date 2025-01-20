import { Component, Input } from '@angular/core';
import { Card } from '../../../../../model/card.type';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})

export class CardComponent {
  @Input() card!: Card;
  
}
