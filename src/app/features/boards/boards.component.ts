import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BoardsService } from './services/boards.service';
import { HttpClient } from '@angular/common/http';

interface Board {
  id: number;
  title: string;
}

@Component({
  selector: 'app-boards',
  standalone: false,

  templateUrl: './boards.component.html',
  styleUrl: './boards.component.css',
})
export class BoardsComponent implements OnInit {
  boards: Board[] = [];

  constructor(private router: Router, private boardsService: BoardsService) {}

  ngOnInit(): void {
    // this.boards = [
    //   { id: 1, title: 'Angular' },
    //   { id: 2, title: 'Dot Net Core' },
    //   { id: 3, title: 'CICD' },
    //   { id: 4, title: 'Azure' },
    //   { id: 5, title: 'AI Features!' },
    // ];
    this.boardsService.getAllBoards().subscribe((data: Board[]) => {
      this.boards = data;
      console.log(this.boards);
    });
  }

  addNewBoard() {
    const boardName = prompt('Enter the board name');
    const newBoard: Board = { id: 1, title: boardName || 'New Board' };
    this.boardsService.AddNewBoard(newBoard).subscribe();
  }

  viewBoard(boardId: number): void {
    this.router.navigate(['/boards', boardId]);
  }

  RemoveBoard(boardId: Number) {
    this.boardsService.RemoveBoard(boardId).subscribe();
  }
}
