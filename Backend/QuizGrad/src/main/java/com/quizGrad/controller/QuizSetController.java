package com.quizGrad.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.quizGrad.Services.QuizService;
import com.quizGrad.model.Questions;
import com.quizGrad.model.QuizSet;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
public class QuizSetController {

	private final QuizService quizService;

	@PostMapping("/saveset")
	public QuizSet saveQuizSet(@RequestBody QuizSet quizSet) {
		int quizSetNo = quizSet.getQuizSetNo();
		int questionStartingNo= quizSetNo*50 +1;
		List<Questions> question = quizSet.getQuestion();
		for(Questions element : question) {
			element.setQuestionNo(questionStartingNo);
			questionStartingNo++;
		}
		QuizSet savedQuizSet = quizService.saveQuizSet(quizSet);
		return savedQuizSet;
	}

	@GetMapping("/getset")
	public QuizSet getSingleQuizSet() {
		QuizSet quizSet = quizService.getSingleQuiz();
		return quizSet;
	}

}
