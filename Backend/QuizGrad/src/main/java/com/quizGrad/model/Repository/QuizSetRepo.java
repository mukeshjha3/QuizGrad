package com.quizGrad.model.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.quizGrad.model.QuizSet;

@Repository
public interface QuizSetRepo extends JpaRepository<QuizSet, Integer> {

}
