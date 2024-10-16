package com.rll.whatscooking.repository;

import com.rll.whatscooking.domain.Comments;

public interface iCommentRepository {
    Comments commentRecipe(Comments comments);
    Comments uncommentRecipe(Comments comments);
}
