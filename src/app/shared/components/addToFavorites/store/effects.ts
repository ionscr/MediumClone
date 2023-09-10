import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AddToFavoritesService} from '../services/addToFavorites.service';
import {catchError, map, of, switchMap} from 'rxjs';
import {addToFavoritesActions} from './actions';
import {ArticleInterface} from 'src/app/shared/types/article.interface';

export const addToFavoritesEffect = createEffect(
  (
    actions$ = inject(Actions),
    addToFavoritesService = inject(AddToFavoritesService)
  ) => {
    return actions$.pipe(
      ofType(addToFavoritesActions.addToFavorites),
      switchMap(({isFavorited, slug}) => {
        const article$ = isFavorited
          ? addToFavoritesService.addToFavorites(slug)
          : addToFavoritesService.removeFromFavorites(slug);
        return article$.pipe(
          map((article: ArticleInterface) => {
            return addToFavoritesActions.addToFavoritesSuccess({article});
          }),
          catchError(() => {
            return of(addToFavoritesActions.addToFavoritesFailure());
          })
        );
      })
    );
  },
  {functional: true}
);
