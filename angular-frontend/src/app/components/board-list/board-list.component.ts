import { Component, inject, NO_ERRORS_SCHEMA, OnInit, signal, WritableSignal } from '@angular/core';
import { BoardComponent } from './board/board.component';
import { BoardServicesTsService } from '../../services/boardService/board.services.ts.service';

import { Board } from '../../model/board.type';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import {MatInputModule} from '@angular/material/input';
import { map } from 'rxjs';
import { ListServiceService } from '../../services/listService/list.service.service';
import { ListComponent } from './board/list/list.component';

@Component({
  selector: 'app-board-list',
  standalone: true,
  imports: [BoardComponent, MatButtonModule, MatIconModule, CommonModule, MatInputModule, ListComponent],
  templateUrl: './board-list.component.html',
  styleUrl: './board-list.component.scss',
  schemas: [NO_ERRORS_SCHEMA]
})
export class BoardListComponent implements OnInit{

  boards: WritableSignal<Board[]> = signal([]);
  selectedBoard: any = null;
  lists: any[] = [];

  displayBoardForm: Boolean = false;

  constructor(private boardService: BoardServicesTsService, private listService: ListServiceService) { }

  ngOnInit(): void {
    this.loadBoards();
  }

  loadBoards(): void {
    this.boardService.getBoards().subscribe((boards: Board[]) => {
      this.boards.set(boards);
      if (boards.length > 0) {
        this.selectBoard(boards[0]); // Automatically select the first board
      }
    });
  }

  selectBoard(board: any): void {
    this.selectedBoard = board;
    this.loadLists(board.id);
  }

  loadLists(boardId: string): void {
    /*this.listService.getLists().subscribe((lists: any[]) => {
      this.lists = lists;
    });*/
  }

  openBoardForm(): void {
    if(this.displayBoardForm){
      this.displayBoardForm = false;
    }else{
      this.displayBoardForm = true;
    }
  }

  createNewBoard(inputTitle: String): void {
    let newBoard: Board = {
      title: inputTitle,
      lists: []
    };
    this.boardService.createBoard(newBoard).subscribe(() => {
      this.loadBoards();
    })
  }

  deleteBoard(boardId: number): void {
    this.boardService.deleteBoard(boardId).subscribe(() => {
      this.loadBoards(); //refresh on deleting board!!!
    });
  }

}
