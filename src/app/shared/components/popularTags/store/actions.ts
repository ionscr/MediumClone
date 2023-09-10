import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {GetPopularTagsResponseInterface} from '../types/getPopularTagsResponse.interface';
import {PopularTagType} from 'src/app/shared/types/popularTag.type';

export const popularTagsActions = createActionGroup({
  source: 'popular tags',
  events: {
    'Get Popular Tags': emptyProps(),
    'Get Popular Tags Success': props<{
      tags: PopularTagType[];
    }>(),
    'Get Popular Tags Failure': emptyProps(),
  },
});
