import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsComponent } from './boards.component';
import { BoardsDetailsComponent } from './BoardsComponents/boards-details/boards-details.component';

@NgModule({
  declarations: [BoardsComponent, BoardsDetailsComponent],
  imports: [CommonModule, BoardsRoutingModule],
})
export class BoardsModule {}
