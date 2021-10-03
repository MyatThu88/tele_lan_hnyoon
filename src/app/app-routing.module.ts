import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'movie-detail/:id',
    loadChildren: () =>
      import('./pages/movie-detail/movie-detail.module').then(
        (m) => m.MovieDetailPageModule
      ),
  },
  {
    path: 'person-detail/:id',
    loadChildren: () =>
      import('./pages/person-detail/person-detail.module').then(
        (m) => m.PersonDetailPageModule
      ),
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
