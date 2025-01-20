import { Component, Input } from '@angular/core';
import { Card } from '../../../../../model/card.type';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})

export class CardComponent {
  @Input() card!: Card; 
  
}
