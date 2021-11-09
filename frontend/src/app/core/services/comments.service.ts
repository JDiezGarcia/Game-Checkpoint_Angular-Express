import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Comment } from '../models';
import { map } from 'rxjs/operators';


@Injectable()
export class CommentsService {
  constructor (
    private apiService: ApiService
  ) {}

  add(id: string, type: string, payload: Object): Observable<{comment: Comment}> {
    return this.apiService
    .post(
      `/comments/${type}/${id}`,
      { content: payload }
    ).pipe(map(data => data.comment));
  }

  reply(commentId: string, id: string, type: string, payload: Object): Observable<Comment> {
    return this.apiService
      .post(
        `/comments/${type}/${id}/${commentId}`,
        { content: payload } 
      ).pipe(map(data => data.comment));
  }

  destroy(commentId: string, id: string, type: string) {
    return this.apiService
           .delete(`/comments/${type}/${id}/${commentId}`);
  }

}
