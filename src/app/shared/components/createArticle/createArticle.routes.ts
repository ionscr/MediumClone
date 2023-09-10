import {Route} from '@angular/router';
import {CreateArticleComponent} from 'src/app/createArticle/components/createArticle.component';

export const routes: Route[] = [
  {
    path: '',
    component: CreateArticleComponent,
  },
];
