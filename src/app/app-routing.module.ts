import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'boards',
    loadChildren: () =>
      import('./features/boards/boards.module').then((m) => m.BoardsModule),
  },
  {
    path: 'cards',
    loadChildren: () =>
      import('./features/cards/cards.module').then((m) => m.CardsModule),
  },
  {
    path: 'lists',
    loadChildren: () =>
      import('./features/lists/lists.module').then((m) => m.ListsModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./features/user/user.module').then((m) => m.UserModule),
  },
  {
    path: '',
    redirectTo: 'boards',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'boards',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
