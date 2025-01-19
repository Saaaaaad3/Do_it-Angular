import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

interface Board {
  id: number;
  title: string;
}

interface AddBoard {
  UserId: number;
  BoardName: string;
}

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  constructor(private httpClient: HttpClient) {}

  boards: Board[] = [];

  getAllBoards(UserId: Number): Observable<Board[]> {
    return this.httpClient
      .get<Board[]>(
        'https://localhost:44318/api/Boards/GetAllBoardsByUserId?UserId=' +
          UserId
      )
      .pipe(
        map((response: any) => {
          return response.map((item: any) => ({
            id: item.boardId,
            title: item.boardName,
          }));
        })
      );
  }

  AddNewBoard(board: Board): Observable<Board> {
    return this.httpClient.post<Board>(
      'https://localhost:44318/api/Boards/AddNewBoard',
      { UserId: board.id, BoardName: board.title },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  RemoveBoard(boardId: Number) {
    return this.httpClient.delete(
      'https://localhost:44318/api/Boards/RemoveBoard?boardId=' + boardId
    );
  }
}
