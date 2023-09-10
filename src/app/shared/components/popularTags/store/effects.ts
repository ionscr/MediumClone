import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {PopularTagsService} from '../services/popularTags.service';
import {popularTagsActions} from './actions';
import {catchError, map, of, switchMap} from 'rxjs';
import {GetPopularTagsResponseInterface} from '../types/getPopularTagsResponse.interface';
import {feedActions} from '../../feed/store/actions';
import {PopularTagType} from 'src/app/shared/types/popularTag.type';

export const getPopularTagsEffect = createEffect(
  (
    actions$ = inject(Actions),
    popularTagsService = inject(PopularTagsService)
  ) => {
    return actions$.pipe(
      ofType(popularTagsActions.getPopularTags),
      switchMap(() => {
        return popularTagsService.getPopularTags().pipe(
          map((tags: PopularTagType[]) => {
            return popularTagsActions.getPopularTagsSuccess({tags});
          }),
          catchError(() => {
            return of(popularTagsActions.getPopularTagsFailure());
          })
        );
      })
    );
  },
  {functional: true}
);
