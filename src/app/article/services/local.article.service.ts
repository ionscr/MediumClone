import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LocalArticleService {
  constructor(private http: HttpClient) {}

  deleteArticle(slug: string): Observable<{}> {
    const apiUrl = `${environment.apiUrl}/articles/${slug}`;
    return this.http.delete(apiUrl);
  }
}
