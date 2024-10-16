package com.rll.whatscooking.repository;

import com.rll.whatscooking.domain.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comments,Integer> {


}
