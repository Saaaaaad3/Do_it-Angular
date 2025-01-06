import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card, List } from '../models/list.model';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private listSubject = new BehaviorSubject<List[]>([]);
  lists$ = this.listSubject.asObservable();

  constructor() {
    const initialList: List[] = [
      {
        id: 1,
        title: 'To Do',
        cards: [
          { id: 1, title: 'Task 1' },
          { id: 2, title: 'Task 2' },
        ],
      },
      {
        id: 2,
        title: 'In Progress',
        cards: [
          { id: 3, title: 'Task 3' },
          { id: 4, title: 'Task 4' },
          { id: 5, title: 'Task 5' },
        ],
      },
      { id: 3, title: 'Completed', cards: [{ id: 6, title: 'Task 6' }] },
    ];
    this.listSubject.next(initialList);
  }

  getLists() {
    return this.lists$;
  }

  addList(title: string) {
    console.log('list adding');
    const currentLists = this.listSubject.getValue();
    const newList: List = { id: currentLists.length + 1, title, cards: [] };
    this.listSubject.next([...currentLists, newList]);
    console.log(this.lists$);
  }

  deleteList(listId: number) {
    const currentLists = this.listSubject.getValue();
    const updatedLists = currentLists.filter((list) => list.id !== listId);
    this.listSubject.next(updatedLists);
  }

  addCard(listId: number, title: string) {
    const currentLists = this.listSubject.getValue();
    const list = currentLists.find((list) => list.id === listId);

    if (list) {
      const newCard: Card = { id: list.cards.length + 1, title };
      list.cards.push(newCard);
      this.listSubject.next([...currentLists]);
    }
    // const currentLists = this.listSubject.value;
    // const updatedLists = currentLists.map((list) =>
    //   list.id === listId
    //     ? {
    //         ...list,
    //         cards: [...list.cards, { id: list.cards.length + 1, title }],
    //       }
    //     : list
    // );
    // this.listSubject.next(updatedLists);
  }

  deleteCard(listId: number, cardId: number) {
    const currentLists = this.listSubject.getValue();
    const list = currentLists.find((list) => list?.id === listId);
    if (list) {
      list.cards = list.cards.filter((card) => card.id !== cardId);
      this.listSubject.next([...currentLists]);
    }
  }

  moveCard(cardId: number, sourceListId: number, targetListId: number) {
    const currentLists = this.listSubject.value;
    let cardToMove: Card | null = null;

    const updatedLists = currentLists.map((list) => {
      if (list.id === sourceListId) {
        cardToMove = list.cards.find((card) => card.id === cardId) || null;
        return {
          ...list,
          cards: list.cards.filter((card) => card.id !== cardId),
        };
      }
      if (list.id === targetListId && cardToMove) {
        return { ...list, cards: [...list.cards, cardToMove] };
      }
      return list;
    });

    this.listSubject.next(updatedLists);
  }
}
