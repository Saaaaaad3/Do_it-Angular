import { Component, OnInit } from '@angular/core';
import { ListService } from '../../services/list.service';
import { List, Card } from '../../models/list.model';
import {
  CdkDragDrop,
  transferArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { Observable, withLatestFrom } from 'rxjs';

@Component({
  selector: 'app-boards-details',
  standalone: false,
  templateUrl: './boards-details.component.html',
  styleUrl: './boards-details.component.css',
})
export class BoardsDetailsComponent implements OnInit {
  lists$!: Observable<List[]>;
  lists: List[] = [];

  constructor(private listService: ListService) {
    this.lists$ = this.listService.lists$;
  }

  boardId!: number;
  newCardTitle!: string;

  showAddCardInput: { [key: number]: boolean } = {};
  isEditingList: { [key: number]: boolean } = {};

  ngOnInit(): void {
    this.listService.getLists().subscribe((lists) => {
      this.lists = lists;
    });
    // this.lists$ = this.listService.lists$;
  }

  addNewList(): void {
    const title = prompt('Enter List Title');
    if (title) {
      console.log('list adding ' + title);
      this.listService.addList(title);
    }
    // const newId = this.lists.length + 1;
    // this.lists.push({ id: newId, title: `New List ${newId}`, cards: [] });
  }

  deleteList(listId: number) {
    // const confirmDelete = prompt('Are you sure you want to delete this list?');
    // if(confirmDelete)
    this.listService.deleteList(listId);
    // this.lists = this.lists.filter((list) => list.id !== listId);
  }

  addNewCard(listId: number) {
    const title = prompt('Enter Card Title');
    if (title) {
      this.listService.addCard(listId, title);
    }
    // if (!this.newCardTitle.trim()) return;
    // const newCard: Card = { id: Date.now(), title: this.newCardTitle.trim() };
    // const list = this.lists.find((l) => l.id === listId);
    // list?.cards.push(newCard);
    // this.cancelAddCard(listId);
  }

  deleteCard(listId: number, cardId: number) {
    // const confirmDelete = prompt("Are you sure you want to delete this card?");
    // if(confirmDelete)
    this.listService.deleteCard(listId, cardId);
  }

  onCardDrop(event: CdkDragDrop<Card[]>, targetList: List) {
    if (event.previousContainer === event.container) {
      // Moving within the same list
      moveItemInArray(
        targetList.cards,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const sourceList = this.lists.find(
        (list) => list.cards === event.previousContainer.data
      );
      // Moving across lists
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

  // onCardDrop(event: CdkDragDrop<Card[]>, targetList: List) {
  //   this.lists$.pipe(withLatestFrom()).subscribe(([lists]) => {
  //     if (event.previousContainer === event.container) {
  //       moveItemInArray(
  //         targetList.cards,
  //         event.previousIndex,
  //         event.currentIndex
  //       );
  //     } else {
  //       // const sourceList = lists.find(
  //       //   (list) => list.cards === event.previousContainer.data
  //       // );
  //       // if (sourceList) {
  //       transferArrayItem(
  //         event.previousContainer.data,
  //         event.container.data,
  //         event.previousIndex,
  //         event.currentIndex
  //       );
  //       // }
  //     }
  //   });
  // }

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

  stopEditingListTitle(ListId: number) {
    this.isEditingList[ListId] = false;
    // change the list name with newly types stuff
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
}
