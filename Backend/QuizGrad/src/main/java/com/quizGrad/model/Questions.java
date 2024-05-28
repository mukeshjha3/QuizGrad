package com.quizGrad.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Questions {
	
    @Id
    private int questionNo;
    
    private String question;   

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Options> options = new ArrayList<>();

    private String answer;
}
