import { Recipe } from './Recipe';
import { User } from './User';

export class Comments {
  commentId?: number;
  comment?: string;
  user?: User;
  recipe?: Recipe;

  constructor(
    commentId?: number,
    comment?: string,
    user?: User,
    recipe?: Recipe
  ) {
    this.commentId = commentId;
    this.comment = comment;
    this.user = user;
    this.recipe = recipe;
  }
}
