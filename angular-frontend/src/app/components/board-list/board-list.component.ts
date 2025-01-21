import { Component, inject, NO_ERRORS_SCHEMA, OnInit, signal, WritableSignal } from '@angular/core';
import { BoardServicesTsService } from '../../services/boardService/board.services.ts.service';
import {MatCardModule} from '@angular/material/card';
import { Board } from '../../model/board.type';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import { catchError, forkJoin, lastValueFrom, Observable, of, switchMap} from 'rxjs'; 
import { ListServiceService } from '../../services/listService/list.service.service';
import { ListComponent } from './list/list.component';
import {MatDividerModule} from '@angular/material/divider';
import { List } from '../../model/list.type';
import { CardServiceService } from '../../services/cardService/card.service.service';

@Component({ 
  selector: 'app-board-list',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, MatInputModule, ListComponent, MatDividerModule, MatCardModule],
templateUrl: './board-list.component.html',
  styleUrl: './board-list.component.scss',
  schemas: [NO_ERRORS_SCHEMA]
})
export class BoardListComponent implements OnInit{ 
  boardService = inject(BoardServicesTsService);
  listService = inject(ListServiceService);
  cardService = inject(CardServiceService);
  boards: WritableSignal<Board[]> = signal([]);
  selectedBoard: any = null;
  lists: any[] = [];

  displayBoardForm: Boolean = false;
  displayListForm: Boolean = false; 

  ngOnInit(): void {
    this.loadBoards();
  }

  private reloadBoards(): void {
    this.loadBoards();
  }

  loadBoards(): void {
    this.boardService.getBoards().subscribe((boards: Board[]) => {
      this.boards.update(() => [...boards]);
      if (boards.length > 0) {
        this.selectedBoard = this.selectedBoard ? boards.find(b => b.id === this.selectedBoard!.id) || boards[0] : boards[0];
        this.loadLists(this.selectedBoard);
      }
    });
  }

  selectBoard(board: any): void {
    this.displayBoardForm = false;
    this.displayListForm = false;
    this.selectedBoard = board;
    this.loadLists(board);
  }

  loadLists(board: Board): void {
    if (!board.lists?.length) {
      this.lists = [];
      return;
    }
  
    forkJoin(board.lists.map(id => this.listService.getList(id)))
      .subscribe({
        next: (listResponses: any[]) => this.lists = listResponses,
        error: (error) => console.error('Error loading lists:', error)
      });
  }

  toggleForm(formType: 'board' | 'list'): void {
    if (formType === 'board') {
      this.displayBoardForm = !this.displayBoardForm;
    } else {
      this.displayListForm = !this.displayListForm;
    }
  }

  createNewBoard(inputTitle: string): void {
    const newBoard: Board = { title: inputTitle, lists: [] };
    this.boardService.createBoard(newBoard).subscribe(this.reloadBoards.bind(this));
  }

  async createNewList(inputTitle: string): Promise<void> {
    const key = await this.generateUniqueId();
    this.updateBoardListsArray(key);
    const newList: List = { id: key, title: inputTitle, board_id: this.selectedBoard!.id, cards: [] };
    this.listService.createList(newList).subscribe(this.reloadBoards.bind(this));
  }

  updateBoardListsArray(listId: number): void {
    const updatedBoard = { ...this.selectedBoard!, lists: [...this.selectedBoard!.lists, listId] };
    this.boardService.updateBoard(updatedBoard).subscribe(this.reloadBoards.bind(this));
  }

  private generateUniqueId(): number {
    return Date.now() + Math.floor(Math.random() * 1000);
  }

  deleteBoardAndItsTablesAndCards(board: Board): void {
    if (!board.lists || board.lists.length === 0) {
      console.warn('No lists found for this board.');
      this.safeDeleteBoard(board);
      this.reloadBoards();
      window.location.reload();
      return;
    }
  
    forkJoin(board.lists.map(id => this.listService.getList(id)))
      .pipe(
        switchMap((lists: any[]) => {
          const cardIds = lists.flatMap(list => list.cards || []);
          
          return forkJoin([
            ...(cardIds.length > 0 ? cardIds.map(cardId => 
              this.cardService.deleteCard(cardId).pipe(
                catchError((err) => {
                  console.error(`Failed to delete card ${cardId}:`, err);
                  return of(null);
                })
              )
            ) : []),
            ...lists.map(list => 
              this.listService.deleteList(list.id).pipe(
                catchError((err) => {
                  console.error(`Failed to delete list ${list.id}:`, err);
                  return of(null);
                })
              )
            )
          ]);
        }),
        switchMap(() => {
          if (board.id !== undefined) {
            return this.boardService.deleteBoard(board.id).pipe(
              catchError((err) => {
                console.error(`Failed to delete board ${board.id}:`, err);
                return of(null);
              })
            );
          } else {
            console.error('Board ID is undefined, unable to delete board.');
            return of(null);
          }
        })
      )
      .subscribe({
        next: () => {
          console.log('Board and its contents deleted successfully');
          this.reloadBoards();
          window.location.reload();
        },
        error: (error) => console.error('Error during deletion process:', error),
      });
  }
  

  private deleteLists(lists: List[]): Observable<any[]> {
    if (lists.length === 0) {
      return new Observable((observer) => {
        observer.next([]);
        observer.complete();
      });
    }
  
    return forkJoin(lists
      .filter((list): list is List => list.id !== undefined)  // Ensure list.id is not undefined
      .map(list => this.listService.deleteList(list.id!)));
  }

  private safeDeleteBoard(board: Board): void {
    if (board.id) {
      this.deleteBoard(board.id);
    } else {
      console.error('Board ID is undefined.');
    }
  }

  private deleteBoard(boardId: number): void {
    this.boardService.deleteBoard(boardId).subscribe({
      next: () => {
        console.log('Board deleted successfully');
        this.reloadBoards(); // Refresh board list after deletion
      },
      error: (error) => console.error('Error deleting board:', error),
    });
  }

}
