import { inject, Injectable } from '@angular/core';
import { List } from '../../model/list.type';
import { Card } from '../../model/card.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardServiceService {

  constructor() { }

      protected cards: Card[] = []
      private apiUrl = "http://localhost:8080/lists"
      http = inject(HttpClient)
    
    
      createCard(card: any){
        return this.http.post(this.apiUrl, card)
      }
       
      getCards(){
        return this.http.get<any>(this.apiUrl)
      }
    
      getCard(id: number){
        return this.http.get(this.apiUrl+"/"+id)
      }
    
      updateCard(card: any){
        return this.http.put(this.apiUrl+"/"+card.id, card )
      }
    
      deleteCard(id: number){
        return this.http.delete(this.apiUrl+"/"+id)
      }
}
