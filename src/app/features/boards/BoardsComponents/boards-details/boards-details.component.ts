import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { List, Card } from '../../models/list.model';
import {
  CdkDragDrop,
  transferArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-boards-details',
  standalone: false,
  templateUrl: './boards-details.component.html',
  styleUrl: './boards-details.component.css',
})
export class BoardsDetailsComponent implements OnInit {
  boardId!: number;
  newCardTitle!: string;

  showAddCardInput: { [key: number]: boolean } = {};
  isEditingList: { [key: number]: boolean } = {};

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
    if (!this.newCardTitle.trim()) return;
    const newCard: Card = { id: Date.now(), title: this.newCardTitle.trim() };
    const list = this.lists.find((l) => l.id === listId);
    list?.cards.push(newCard);
    this.cancelAddCard(listId);
  }

  onCardDrop(event: CdkDragDrop<Card[]>, targetList: List) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        targetList.cards,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const sourceList = this.lists.find(
        (list) => list.cards === event.previousContainer.data
      );
      if (sourceList) {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      }
    }
  }

  cancelAddCard(listId: number) {
    this.showAddCardInput[listId] = false;
    this.newCardTitle = '';
  }

  toggleAddCardInput(listId: number) {
    this.showAddCardInput[listId] = true;
  }

  editListTitle(ListId: number) {
    this.isEditingList[ListId] = true;
  }

  cancelEditingListTitle(ListId: number) {
    this.isEditingList[ListId] = false;
    // discard the newly typed stuff
  }

  stopEditingListTtitle(ListId: number) {
    this.isEditingList[ListId] = false;
    // change the list name with newly types stuff
  }

  deleteList(listId: number) {
    this.lists = this.lists.filter((list) => list.id !== listId);
  }

  editCardTitle(card: Card) {
    card.isEditing = true;
  }

  saveEditedCardTitle(card: Card) {
    card.isEditing = false;
  }
  cancelCardEdit(card: Card) {
    card.isEditing = false;
  }

  deleteCard(listId: number, cardId: number) {
    const list = this.lists.find((list) => list.id === listId);
    if (list) {
      list.cards = list?.cards.filter((cards) => cards.id !== cardId);
    }
  }
}
