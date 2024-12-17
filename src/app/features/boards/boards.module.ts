import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsComponent } from './boards.component';
import { BoardsDetailsComponent } from './BoardsComponents/boards-details/boards-details.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [BoardsComponent, BoardsDetailsComponent],
  imports: [CommonModule, BoardsRoutingModule, DragDropModule, FormsModule],
})
export class BoardsModule {}
