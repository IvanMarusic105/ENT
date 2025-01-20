import { Component, Input } from '@angular/core';
import { ListServiceService } from '../../../../services/listService/list.service.service';
import { List } from '../../../../model/list.type';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { CardComponent } from './card/card.component';
import { CardServiceService } from '../../../../services/cardService/card.service.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,CardComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  @Input() list!: List;
  cards: any[] = [];

  constructor(private listService: ListServiceService, private cardService: CardServiceService) {}

  ngOnInit(): void {
    if (this.list) {
      this.loadCards(this.list);
    }
  }

  loadCards(list: List): void {
    /*if (!list.cards || list.cards.length === 0) {
          this.cards = [];
          return;
        }
      
        const cardRequests = list.cards.map(cardId =>
          this.cardService.getCard(cardId)
        );
      
        // Use forkJoin to wait for all requests to complete
        forkJoin(cardRequests).subscribe({
          next: (cardResponse) => {
            this.cards = cardResponse;
            console.log('All cards loaded:', this.cards);
          },
          error: (error) => {
            console.error('Error loading cards:', error);
          }
        });*/
  }

  addCard(){
    
  }

}
