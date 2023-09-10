import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {EditArticleService} from '../services/editArticle.service';
import {catchError, map, of, switchMap, tap} from 'rxjs';
import {editArticleActions} from './actions';
import {ArticleInterface} from 'src/app/shared/types/article.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {ArticleService as SharedArticleService} from 'src/app/shared/services/article.service';

export const getArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    articleService = inject(SharedArticleService)
  ) => {
    return actions$.pipe(
      ofType(editArticleActions.getArticle),
      switchMap(({slug}) => {
        return articleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return editArticleActions.getArticleSuccess({article});
          }),
          catchError(() => {
            return of(editArticleActions.getArticleFailure());
          })
        );
      })
    );
  },
  {functional: true}
);

export const updateArticleEffect = createEffect(
  (
    actions$ = inject(Actions),
    editArticleService = inject(EditArticleService)
  ) => {
    return actions$.pipe(
      ofType(editArticleActions.updateArticle),
      switchMap(({request, slug}) => {
        return editArticleService.updateArticle(request, slug).pipe(
          map((article: ArticleInterface) => {
            return editArticleActions.updateArticleSuccess({article});
          }),
          catchError((errors: HttpErrorResponse) => {
            return of(
              editArticleActions.updateArticleFailure({
                errors: errors.error.errors,
              })
            );
          })
        );
      })
    );
  },
  {functional: true}
);

export const redirectAfterEditArticleEffect = createEffect(
  (actions$ = inject(Actions), router = inject(Router)) => {
    return actions$.pipe(
      ofType(editArticleActions.updateArticleSuccess),
      tap(({article}) => {
        router.navigate(['/articles', article.slug]);
      })
    );
  },
  {functional: true, dispatch: false}
);