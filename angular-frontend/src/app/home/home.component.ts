import { Component } from '@angular/core';
import { BoardListComponent } from '../components/board-list/board-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BoardListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
