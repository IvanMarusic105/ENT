import { inject, Injectable } from '@angular/core';
import { List } from '../../model/list.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListServiceService {

  constructor() { }

    protected lists: List[] = []
    private apiUrl = "http://localhost:8080/lists"
    http = inject(HttpClient)
  
  
    createList(list: any){
      return this.http.post(this.apiUrl, list)
    }
     
    getLists(){
      return this.http.get<any>(this.apiUrl)
    }
  
    getList(id: number){
      return this.http.get(this.apiUrl+"/"+id)
    }
  
    updateList(list: any){
      return this.http.put(this.apiUrl+"/"+list.id, list )
    }
  
    deleteList(id: number){
      return this.http.delete(this.apiUrl+"/"+id)
    }
}
