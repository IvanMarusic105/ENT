import { inject, Injectable } from '@angular/core';
import { Board } from '../../model/board.type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class BoardServicesTsService {
  constructor() { }

  protected boards: Board[] = []
  private apiUrl = "http://localhost:8080/boards"
  http = inject(HttpClient)


  createBoard(board: Board){
    return this.http.post(this.apiUrl, board)
  }
   
  getBoards(): Observable<Board[]>{
    return this.http.get<Board[]>(this.apiUrl)
  }

  getBoard(id: number){
    return this.http.get(this.apiUrl+"/"+id)
  }

  updateBoard(board: Board){
    return this.http.put(this.apiUrl+"/"+board.id, board )
  }

  deleteBoard(id: number){
    return this.http.delete(this.apiUrl+"/"+id)
  }

}
