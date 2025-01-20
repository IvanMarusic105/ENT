import { Component, inject, NO_ERRORS_SCHEMA, OnInit, signal, WritableSignal } from '@angular/core';
import { BoardServicesTsService } from '../../services/boardService/board.services.ts.service';
import {MatCardModule} from '@angular/material/card';
import { Board } from '../../model/board.type';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { forkJoin, lastValueFrom} from 'rxjs'; 
import { ListServiceService } from '../../services/listService/list.service.service';
import { ListComponent } from './board/list/list.component';
import {MatDividerModule} from '@angular/material/divider';
import { List } from '../../model/list.type';
@Component({ 
  selector: 'app-board-list',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, MatInputModule, ListComponent, MatDividerModule, MatCardModule],
  templateUrl: './board-list.component.html',
  styleUrl: './board-list.component.scss',
  schemas: [NO_ERRORS_SCHEMA]
})
export class BoardListComponent implements OnInit{ 

  boards: WritableSignal<Board[]> = signal([]);
  selectedBoard: any = null;
  lists: any[] = [];

  displayBoardForm: Boolean = false;
  displayListForm: Boolean = false;

  constructor(private boardService: BoardServicesTsService, private listService: ListServiceService) { }

  ngOnInit(): void {
    this.loadBoards();
  }

  loadBoards(): void {
    this.boardService.getBoards().subscribe((boards: Board[]) => {
      this.boards.update(() => [...boards]);
      if (boards.length > 0) {
        this.selectBoard(boards[0]); // Automatically select the first board
      }
    });
  }

  selectBoard(board: any): void {
    this.selectedBoard = board;
    this.loadLists(board);
  }

  loadLists(board: Board): void {
    if (!board.lists || board.lists.length === 0) {
      this.lists = [];
      return;
    }
  
    const listRequests = board.lists.map(listId =>
      this.listService.getList(listId)
    );
  
    // Use forkJoin to wait for all requests to complete
    forkJoin(listRequests).subscribe({
      next: (listResponses) => {
        this.lists = listResponses;
        console.log('All lists loaded:', this.lists);
      },
      error: (error) => {
        console.error('Error loading lists:', error);
      }
    });
  }

  openBoardForm(): void {
    if(this.displayBoardForm){
      this.displayBoardForm = false;
    }else{
      this.displayBoardForm = true;
    }
  }

  openListForm(): void {
    if(this.displayListForm){
      this.displayListForm = false;
    }else{
      this.displayListForm = true;
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

  createNewList(inputTitle: String): void {
    let newList: List = {
      title: inputTitle,
      board_id: this.selectedBoard.id,
      cards: []
    };
    /*this.listService.createList(newList).subscribe((list: any) => {
      this.updateBoardListsArray(52)
      this.loadBoards();
    });*/
    this.updateBoardListsArray(52)
  }

  updateBoardListsArray(listid: number): void {
    let newBoard: Board = {
      id: this.selectedBoard.id,
      title: this.selectedBoard.title,
      lists: [...this.selectedBoard.lists, listid]
    };
    this.boardService.updateBoard(newBoard).subscribe(() => {
      this.loadBoards();
    })
  }

  deleteBoard(boardId: number): void {
    this.boardService.deleteBoard(boardId).subscribe(() => {
      this.boards.update((currentBoards) => 
        currentBoards.filter(board => board.id !== boardId)
      );
      if (this.selectedBoard?.id === boardId) {
        this.selectedBoard = null;
      }
    });

  }

}
