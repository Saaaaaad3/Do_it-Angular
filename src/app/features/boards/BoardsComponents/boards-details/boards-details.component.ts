import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../../services/list.service';
import { List, Card } from '../../models/list.model';

@Component({
  selector: 'app-boards-details',
  standalone: false,

  templateUrl: './boards-details.component.html',
  styleUrl: './boards-details.component.css',
})
export class BoardsDetailsComponent implements OnInit {
  boardId!: number;

  lists: List[] = [];

  constructor(private listService: ListService) {}

  ngOnInit(): void {
    this.listService.getLists().subscribe((lists) => (this.lists = lists));
  }

  addNewList(): void {
    const newId = this.lists.length + 1;
    this.lists.push({ id: newId, title: `New List ${newId}`, cards: [] });
  }

  addNewCard(listId: number) {
    const title = prompt('Enter card title');
    if (title) this.listService.addCard(listId, title);
  }
}