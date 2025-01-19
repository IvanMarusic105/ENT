import { Component, Input } from '@angular/core';
import { ListServiceService } from '../../../../services/listService/list.service.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  @Input() listId!: number;

  list: any;

  constructor(private listService: ListServiceService) {}

  ngOnInit(): void {
    if (this.listId) {
      this.loadList();
    }
  }

  loadList(): void {
    this.listService.getList(this.listId).subscribe((list) => {
      this.list = list;
    });
  }
  addCard(){
    
  }

}
