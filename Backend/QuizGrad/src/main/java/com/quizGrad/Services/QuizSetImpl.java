package com.quizGrad.Services;

import java.util.Optional;
import java.util.Random;

import org.springframework.stereotype.Service;

import com.quizGrad.model.QuizSet;
import com.quizGrad.model.Repository.QuizSetRepo;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class QuizSetImpl implements QuizService {

	private final QuizSetRepo quiSetRepo;

	@Override
	public QuizSet saveQuizSet(QuizSet quizSet) {
		return quiSetRepo.save(quizSet);
	}

	@Override
	public QuizSet getSingleQuiz() {
		int size = quiSetRepo.findAll().size()-1;
		Random random = new Random();
		int randomNumber = random.nextInt((size - 0) + 1) + 0;
		System.out.println(randomNumber);
		QuizSet quizSet = quiSetRepo.findById(randomNumber).get();
		return quizSet;
	}

}
