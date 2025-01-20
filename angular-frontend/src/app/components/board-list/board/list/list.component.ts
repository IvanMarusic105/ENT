import { Component, Input } from '@angular/core';
import { ListServiceService } from '../../../../services/listService/list.service.service';
import { List } from '../../../../model/list.type';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { CardComponent } from './card/card.component';
import { CardServiceService } from '../../../../services/cardService/card.service.service';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Card } from '../../../../model/card.type';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,CardComponent,CommonModule,MatFormFieldModule,MatInputModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss' 
})
export class ListComponent {
  @Input() list!: List;
  cards: any[] = [];

  displayCardForm: Boolean = false;

  constructor(private listService: ListServiceService, private cardService: CardServiceService) {}

  ngOnInit(): void {
    if (this.list) {
      this.loadCards(this.list);
    }
  }

  loadCards(list: List): void { 
    if (!list.cards || list.cards.length === 0) {
      this.cards = [];
      return;
    }
  
    const cardRequests = list.cards.map(cardId =>
      this.cardService.getCard(cardId)
    );
  
    // Use forkJoin to wait for all requests to complete
    forkJoin(cardRequests).subscribe({
      next: (cardResponses) => {
        this.cards = cardResponses;
        console.log('All cards loaded:', this.cards);
      },
      error: (error) => {
        console.error('Error loading cards:', error);
      }
    });
  }

  toggleCardForm(): void {
    this.displayCardForm = !this.displayCardForm;
  }

  private generateUniqueId(): number {
    return Date.now() + Math.floor(Math.random() * 1000);
  }

  async createNewCard(cardTitle: string, cardDescription: string): Promise<void> {
    let key = await this.generateUniqueId();
    this.updateListCardsArray(key)
    /*const newCard: Card = {
      id: key,
      title: cardTitle,
      description: cardDescription,
      list_id: this.list.id!,
    };
    this.cardService.createCard(newCard).subscribe(() => {
      //this.loadCards()
    })*/
  }

  updateListCardsArray(cardId: number): void{
    let newList: List = {
      id: this.list.id,
      title: "update working"+this.list.board_id,
      board_id: 4,
      cards: [...this.list.cards]
    };
    this.listService.updateList(newList).subscribe(() => {

    })
  }

}
