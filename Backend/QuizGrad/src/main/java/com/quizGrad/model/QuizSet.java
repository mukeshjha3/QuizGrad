package com.quizGrad.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class QuizSet {

    @Id
    private int quizSetNo;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Questions> question = new ArrayList<>();

}
