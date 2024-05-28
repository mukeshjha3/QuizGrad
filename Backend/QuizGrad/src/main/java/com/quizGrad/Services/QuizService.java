package com.quizGrad.Services;

import com.quizGrad.model.QuizSet;


public interface QuizService {

	public QuizSet saveQuizSet(QuizSet quizSet);
	
	public QuizSet getSingleQuiz();
}
