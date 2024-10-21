import { Nutrition } from './../../Models/Nutrition';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Comments } from 'src/app/Models/Comments';
import { Recipe } from 'src/app/Models/Recipe';
import { User } from 'src/app/Models/User';
import { CommentserviceService } from 'src/app/Services/commentservice.service';
import { RecipeServiceService } from 'src/app/Services/recipe-service.service';

@Component({
  selector: 'app-viewrecipe',
  templateUrl: './viewrecipe.component.html',
  styleUrls: ['./viewrecipe.component.css'],
})
export class ViewrecipeComponent implements OnInit {
  recipe: Recipe = new Recipe();
  message: string = '';
  comments: Comments[] = [];
  displayedComments: any[] = [];
  user: User = new User();
  showMore = false;
  isLiked: boolean = false;
  rating: number = 0;
  newComment: Comments = new Comments();
  canAddComment: boolean = true;
  isEditable: boolean = false;
  nutrition: Nutrition = new Nutrition();
  constructor(
    private recipeService: RecipeServiceService,
    private router: Router,
    private commentService: CommentserviceService,
    private toastr: ToastrService
  ) {
    const user = sessionStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
    } else {
      this.router.navigate(['/login']);
    }
    this.fetchRecipe();
  }

  ngOnInit(): void {}

  fetchRecipe() {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { recipe: Recipe };
    const recipe = state.recipe;

    const queryParams = navigation?.extras.queryParams as { endorse: boolean };
    if (queryParams && queryParams.endorse) {
      this.isEditable = true;
    }
    if (recipe) {
      setTimeout(async () => {
        try {
          const data = await this.recipeService
            .getRecipe(recipe.recipe_id ? recipe.recipe_id : 0)
            .toPromise();
          if (data) {
            this.recipe = data;
            this.recipe.likedUser &&
            this.recipe.likedUser.filter(
              (user) => user.userId == this.user.userId
            ).length > 0
              ? (this.isLiked = true)
              : (this.isLiked = false);
            this.fetchComments();
            this.calculateRating();
          } else {
            console.error('Recipe data is undefined');
          }
        } catch (error) {
          console.error('Error fetching recipe', error);
        }
      }, 500);
    } else {
      this.router.navigate(['/view-all-recipe']);
    }
  }

  fetchComments() {
    this.commentService
      .getComments(this.recipe.recipe_id ? this.recipe.recipe_id : 0)
      .subscribe((data) => {
        this.calculateRating();
        this.comments = data;
        this.canAddComment =
          this.comments.filter(
            (comment) => comment.user && comment.user.userId == this.user.userId
          ).length == 0;
        this.displayedComments = this.comments.slice(0, 2);
      });
  }

  toggleShowMore() {
    this.showMore = !this.showMore;
    if (this.showMore) {
      this.displayedComments = this.comments;
    } else {
      this.displayedComments = this.comments.slice(0, 2);
    }
  }

  hasMoreComments() {
    return this.comments.length > 2;
  }

  async toggleLike() {
    let recipe = this.recipe;
    recipe.likedUser = [this.user];

    try {
      if (this.isLiked) {
        await this.recipeService.unlikeRecipe(recipe).toPromise();
        this.isLiked = false;
        this.toastr.success('Recipe unliked successfully!');
      } else {
        await this.recipeService.likeRecipe(recipe).toPromise();
        this.isLiked = true;
        this.toastr.success('Recipe liked successfully!');
      }
      const fetchedRecipe = await this.recipeService
        .getRecipe(this.recipe.recipe_id ? this.recipe.recipe_id : 0)
        .toPromise();
      if (fetchedRecipe) {
        this.recipe = fetchedRecipe;
      } else {
        this.toastr.error('Error fetching updated recipe!');
      }
      this.calculateRating();
    } catch (error) {
      this.toastr.error(
        `Error ${this.isLiked ? 'unliking' : 'liking'} recipe!`
      );
      console.error('Error', error);
      this.calculateRating();
    }
  }

  calculateRating() {
    if (this.recipe && this.recipe.likedUser) {
      const totalLikes = this.recipe.likedUser.length;
      this.rating = Math.min(5, Math.floor(totalLikes / 2));
    }
  }

  addComment() {
    this.newComment.commentId = 0;
    this.newComment.recipe = this.recipe;
    this.newComment.user = this.user;

    this.commentService.commentRecipe(this.newComment).subscribe(
      (data) => {
        this.comments.push(data);
        this.fetchComments();
        this.displayedComments = this.comments.slice(0, 2);

        this.toastr.success('Comment added successfully!');
      },
      (error) => {
        this.fetchComments();
        this.toastr.error('Error adding comment!');
      }
    );
    this.newComment = new Comments(); //reset comment;
  }
  deleteComment(comment: Comments) {
    this.commentService.uncommentRecipe(comment).subscribe(
      (data) => {
        this.fetchComments();
        this.toastr.success('Comment deleted successfully!');
      },
      (error) => {
        this.fetchComments();
        this.toastr.error('Error deleting comment!');
      }
    );
  }
  endorseRecipe() {
    let recipe = this.recipe;
    recipe.endorsed = true;
    recipe.nutrition = this.nutrition;
    recipe.nutrition.user = this.user;
    this.recipeService.endorseRecipe(recipe).subscribe({
      next: (response: string) => {
        if (response) {
          this.toastr.success('Recipe endorsed successfully');
          this.isEditable = false;
          this.nutrition = new Nutrition();
          this.router.navigate(['/viewrecipe'], {
            state: { recipe: recipe },
          });
        } else {
          this.toastr.error('Failed to endorse recipe');
          console.error('Error endorsing recipe: Unknown error');
        }
      },
      error: (error) => {
        this.toastr.error('Failed to endorse recipe');
        console.error('Error endorsing recipe:', error);
      },
    });
  }
}
