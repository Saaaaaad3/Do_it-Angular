import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsComponent } from './boards.component';
import { BoardsDetailsComponent } from './BoardsComponents/boards-details/boards-details.component';

const routes: Routes = [
  { path: '', component: BoardsComponent },
  { path: ':id', component: BoardsDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardsRoutingModule {}
