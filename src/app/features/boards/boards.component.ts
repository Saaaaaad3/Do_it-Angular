import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.boards = [
      { id: 1, title: 'Angular' },
      { id: 2, title: 'Dot Net Core' },
      { id: 3, title: 'CICD' },
      { id: 4, title: 'Azure' },
      { id: 5, title: 'AI Features!' },
    ];
  }

  addNewBoard(): void {
    const newId = this.boards.length + 1;
    this.boards.push({ id: newId, title: `New board ${newId}` });
  }

  viewBoard(boardId: number): void {
    this.router.navigate(['/boards', boardId]);
  }
}
